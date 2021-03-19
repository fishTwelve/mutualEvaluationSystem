<template>
    <div>
        <input
            v-show="false"
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
        >
            导入
        </el-button>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%; margin-top: 10px;"
                highlight-current-row
                empty-text="无数据"
            >
                <el-table-column
                    v-for="item of tableHeader"
                    :key="item"
                    :prop="item"
                    :label="item"
                />
            </el-table>
        </div>
    </div>
</template>

<script>
import XLSX from 'xlsx';

export default {
    name: 'StudentImport',
    props: {
        msg: String
    },
    data() {
        return {
            tableData: [],
            tableHeader: [],
            test: undefined
        };
    },
    mounted() {
        // const test = {
        //     animial: {
        //         dog: {
        //             test: 'yjy'
        //         }
        //     }
        // };
        // const run = test?.animial?.ca;
        // console.log(run);
        // console.log(test.animial.dog.any.age);

        // if (test.animial && test.animial.cat) {
        //     console.log('run1');
        // }
        // if (test?.animial?.cat) {
        //     console.log('run2');
        // }
        const a = {
            num: 0
        };
        /* eslint-disable */
        a.valueOf = function() {
            return this.num;
        };
        console.log(typeof a.valueOf());
        console.log(typeof a.num);
        console.log(a.num === a.valueOf())
    },
    methods: {
        handleUpload() {
            this.$refs['excel-upload-input'].click();
        },
        handleClick(e) {
            const files = e.target.files;
            const fileobj = files[0];
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
            if (!fileType) {
                this.$message('格式错误！请重新选择');
                return;
            }
            this.file2Xce(fileobj).then(tabJson => {
                if (tabJson && tabJson.length) {
                    this.tableData = tabJson;
                }
            });
        },
        file2Xce(file) {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = e => {
                    const data = e.target.result;
                    this.wb = XLSX.read(data, {type: 'binary'});
                    const firstSheetName = this.wb.SheetNames[0];
                    const worksheet = this.wb.Sheets[firstSheetName];
                    if (worksheet['!ref'] === undefined) {
                        this.$message('excel文件为空！请重新选择');
                        this.loading = false;
                        return false;
                    }
                    const header = this.getHeaderRow(worksheet);
                    const results = XLSX.utils.sheet_to_json(worksheet);
                    this.tableHeader = header;
                    resolve(results);
                };
            });
        },
        getHeaderRow(sheet) {
            const headers = [];

            // 获取工作表的范围
            const range = XLSX.utils.decode_range(sheet['!ref']);

            // 行
            let C;

            // 列
            const R = range.s.r;
            for (C = range.s.c; C <= range.e.c; ++C) {

                // 获取单元格的值
                const cell = sheet[XLSX.utils.encode_cell({c: C, r: R})];

                // 默认值
                let hdr = 'UNKNOWN ' + C;
                if (cell && cell.t) {

                    // 生成单元格文本值
                    hdr = XLSX.utils.format_cell(cell);
                };
                headers.push(hdr);
            }
            return headers;
        }
    }
};
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
