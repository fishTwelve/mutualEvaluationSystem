<template>
    <div class="homeWork">
        <el-container style="height: 800px;">
            <el-header style="overflow: hidden;">
                <el-row>
                    <el-col :span="8" :offset="10">
                        <span class="color">xx系统</span>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-main>
                    <el-row>
                        <el-col :span="2" :offset="8">
                            <el-input
                                v-model="id"
                                :rows="5"
                                placeholder="请输入team id.."
                            />
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 40px;">
                        <el-col :span="8" :offset="8">
                            <el-input
                                v-model="content"
                                type="textarea"
                                :rows="10"
                                placeholder="code.."
                            />
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 40px;">
                        <el-col :span="3" :offset="8">
                            <el-button
                                :loading="btnloading"
                                type="primary"
                                size="small"
                                @click="done"
                            >
                                打印
                            </el-button>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import '@/assets/common.css';
export default {
    name: 'index',
    data() {
        return {

            // code输入框的内容
            content: '',

            // id输入框的内容

            id: ''
        };
    },
    methods: {
    }
};
</script>
<style lang="less">
.text {
    font-size: 14px;
}
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
