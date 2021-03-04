<template>
    <div class="hello">
        <input
            ref="excel-upload-input"
            class="excel-upload-input"
            type="file"
            accept=".xlsx, .xls"
            @change="handleClick"
        >
        <el-button
            :loading="btnloading"
            style="margin-left:16px;"
            type="primary"
            size="small"
            @click="handleUpload"
            >导入Excel</el-button
        >
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import XLSX from 'xlsx';

export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            tableData: [],
            loading: false,
            xlsxJson: []
        };
    },
    methods: {
        handleUpload() {
            const dom = document.getElementsByClassName('excel-upload-input')[0]
            dom.addEventListener('click', this.handleClick)
            // this.$refs['excel-upload-input'].click();
            // this.loading = true
        },
        handleClick(e:any) {
            let files = e.target.files;
            let fileobj = files[0];
            const types = fileobj.name.split('.')[1];
            const fileType = [
                'xlsx',
                'xlc',
                'xlm',
                'xls',
                'xlt',
                'xlw',
                'csv'
            ].some(item => item === types);
            this.loading = true;
            if (!fileType) {
                this.loading = false;
                // this.$message('格式错误！请重新选择');
                return;
            }
            this.file2Xce(fileobj).then((tabJson:any) => {
                if (tabJson && tabJson.length > 0) {
                    this.xlsxJson = tabJson;
                    this.loading = false;
                    console.log('数据', this.xlsxJson);
                    // xlsxJson就是解析出来的json数据,数据格式如下
                    // [
                    //   {
                    //     sheetName: sheet1
                    //     sheet: sheetData
                    //   }
                    // ]
                }
            });
        },
        file2Xce(file: object) {
            let self:any = this;
            return new Promise(function (resolve, reject) {
                const reader:any = new FileReader();
                reader.onload = function (e:any) {
                    const data = e?.target?.result ? e.target.result : null;
                    self.wb = XLSX.read(data, {type: 'binary'});
                    console.log('binary格式是：', self.wb);
                    // 这段代码是处理成表格显示到页面上
                    let firstSheetName = self.wb.SheetNames[0];
                    let worksheet = self.wb.Sheets[firstSheetName];
                    if (worksheet['!ref'] === undefined) {
                        self.$message('excel文件为空！请重新选择');
                        self.loading = false;
                        return false;
                    }
                    let results = XLSX.utils.sheet_to_json(worksheet);
                    self.tableData = results;
                    console.log('表格数据是：', results);
                    console.log(self.tableData)
                    const result:any = [];
                    self.wb.SheetNames.forEach((sheetName: any) => {
                        result.push({
                            sheetName: sheetName,
                            sheet: XLSX.utils.sheet_to_json(
                                self.wb.Sheets[sheetName]
                            )
                        });
                    });
                    resolve(result);
                };
                // reader.readAsBinaryString(file.raw)
                reader.readAsBinaryString(file);
            });
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
