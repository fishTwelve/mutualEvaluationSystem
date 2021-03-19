<template>
    <div class="about">
        <el-container style="height: 500px;">
            <el-header style="overflow: hidden;">
                <el-row>
                    <el-col :span="4">
                        <span class="color">师生共评管理系统</span>
                    </el-col>
                    <el-col :span="6">
                        <el-menu
                            :default-active="activeIndex"
                            mode="horizontal"
                            background-color="#409EFF"
                            text-color="#FFF"
                            @select="handleSelect"
                        >
                            <el-menu-item index="1">学生导入</el-menu-item>
                            <el-menu-item index="2">课程管理</el-menu-item>
                            <el-menu-item index="3">作业管理</el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside
                    width="200px"
                >
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                    >
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span>导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-document"></i>
                            <span>导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span>导航四</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-table :data="tableData">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="140"
                        />
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="120"
                        />
                        <el-table-column prop="address" label="地址"/>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import '@/assets/common.css';
export default {
    data() {
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
            tableData: Array(20).fill(item)
        };
    }
};
</script>
<style lang="less" scoped>
    .el-header {
        background-color: #409EFF;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
    .el-menu {
        height: 100%;
    }
    .el-menu--horizontal {
        border-bottom: none;
    }
</style>
