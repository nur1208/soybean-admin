<template>
  <div>
    <n-card class="h-full shadow-sm rounded-16px">
      <n-space :vertical="true">
        <n-space>
          <n-button @click="getDataSource">新增</n-button>
          <n-button @click="getEmptyDataSource">展开折叠</n-button>
        </n-space>
        <loading-empty-wrapper class="h-480px" :loading="loading" :empty="empty">
          <n-data-table :columns="columns" :data="dataSource" :flex-height="true" class="h-480px" />
        </loading-empty-wrapper>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import { NSpace, NButton, NPopconfirm } from 'naive-ui';
import type { DataTableColumn } from 'naive-ui';
import { useLoadingEmpty } from '@/hooks';
import { getRandomInteger } from '@/utils';

interface DataSource {
  name: string;
  age: number;
  address: string;
}

const { loading, startLoading, endLoading, empty, setEmpty } = useLoadingEmpty();

const columns: DataTableColumn[] = [
  {
    title: '菜单名称',
    key: 'name',
    align: 'center'
  },
  {
    title: '类型',
    key: 'type',
    align: 'center'
  },
  {
    title: '图标',
    key: 'icon',
    align: 'center'
  },
  {
    title: '权限标识',
    key: 'permissionID',
    align: 'center'
  },
  {
    title: '状态',
    key: 'state',
    align: 'center'
  },
  {
    title: '排序',
    key: 'sequence',
    align: 'center'
  },
  {
    title: '创建时间',
    key: 'creation',
    align: 'center'
  }
];

const dataSource = ref<DataSource[]>([]);

function createDataSource(): DataSource[] {
  return Array(100)
    .fill(1)
    .map((_item, index) => {
      return {
        name: `Name${index}`,
        icon: `icon${index}`,
        type: `type${index}`,
        permissionID: getRandomInteger(30, 20),
        state: `state${index}`,
        sequence: `sequence${index}`,
        creation: `2002`
      };
    });
}

function getDataSource() {
  startLoading();
  setTimeout(() => {
    dataSource.value = createDataSource();
    endLoading();
    setEmpty(!dataSource.value.length);
  }, 1000);
}

function getEmptyDataSource() {
  startLoading();
  setTimeout(() => {
    dataSource.value = [];
    endLoading();
    setEmpty(!dataSource.value.length);
  }, 1000);
}

onMounted(() => {
  getDataSource();
});
</script>

<style scoped></style>
