<template>
    <div class="home">
        <student-import/>
    </div>
</template>

<script>
import StudentImport from '@/components/StudentImport.vue';

export default {
    name: 'Home',
    components: {
        StudentImport,
    },
};
</script>
