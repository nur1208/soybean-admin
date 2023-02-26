<template>
  <div>
    <n-card class="h-full shadow-sm rounded-16px">
      <n-space :vertical="true">
        <n-space>
          <n-button @click="setShowModal(true)">新增</n-button>
          <n-button @click="getEmptyDataSource">展开折叠</n-button>
        </n-space>
        <loading-empty-wrapper class="h-480px" :loading="loading" :empty="empty">
          <n-data-table
            :row-class-name="rowClassName"
            :columns="columns"
            :data="dataSource"
            :flex-height="true"
            class="h-480px"
          />
        </loading-empty-wrapper>
      </n-space>
    </n-card>
    <n-modal v-model:show="showModal">
      <n-card style="width: 800px" title="单列表" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <template #header-extra>
          <n-button @click="setShowModal(false)"> x </n-button>
        </template>
        <n-form ref="formRef" :label-width="80" :model="formValue">
          <n-grid :span="24" :x-gap="24">
            <n-form-item-gi :span="12" label="菜单名称" path="name">
              <n-input v-model:value="formValue.name" placeholder="Input Name" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="类型" path="type">
              <n-input v-model:value="formValue.type" placeholder="Input type" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="图标" path="icon">
              <n-input v-model:value="formValue.icon" placeholder="Input icon" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="权限标识" path="permissionID">
              <n-input v-model:value="formValue.permissionID" placeholder="Input permissionID" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="状态" path="state">
              <n-input v-model:value="formValue.state" placeholder="Input State" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="排序" path="sequence">
              <n-input v-model:value="formValue.sequence" placeholder="Input sequence" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="创建时间" path="creation">
              <n-input v-model:value="formValue.creation" placeholder="Input creation" />
            </n-form-item-gi>
            <n-form-item-gi :span="12">
              <n-button @click="handleSave"> 保存 </n-button>
            </n-form-item-gi>
          </n-grid>
          <!-- <n-form-item label="Name" path="user.name">
            <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
          </n-form-item>
          <n-form-item label="Age" path="user.age">
            <n-input v-model:value="formValue.user.age" placeholder="Input Age" />
          </n-form-item>
          <n-form-item label="Phone" path="phone">
            <n-input v-model:value="formValue.phone" placeholder="Phone Number" />
          </n-form-item>

          <n-form-item>
            
          </n-form-item> -->
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref, defineComponent } from 'vue';
// import { NSpace, NButton, NPopconfirm } from 'naive-ui';
import type { FormInst } from 'naive-ui';
import type { DataTableColumn } from 'naive-ui';
import { useLoadingEmpty, useBoolean } from '@/hooks';
import { getRandomInteger } from '@/utils';

interface DataSource {
  name: string;
  type: string;
  permissionID: string;
  state: string;
  sequence: string;
  creation: string;
  icon: string;
}
const formRef = ref<FormInst | null>(null);
const formValue = ref({
  name: '',
  type: '',
  permissionID: '',
  state: '',
  sequence: '',
  creation: '',
  icon: ''
});

const { loading, startLoading, endLoading, empty, setEmpty } = useLoadingEmpty();
const { bool: showModal, setBool: setShowModal } = useBoolean(false);
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
    className: 'state',
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

const handleSave = () => {
  console.log(formValue.value);
  dataSource.value.push(formValue.value);
  setShowModal(false);
};
function createDataSource(): DataSource[] {
  return Array(6)
    .fill(1)
    .map((_item, index) => {
      return {
        name: `Name${index}`,
        icon: `icon${index}`,
        type: `type${index}`,
        permissionID: getRandomInteger(30, 20),
        state: `${index % 2 === 0 ? 'available' : 'unavailable'}`,
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
function rowClassName(row) {
  if (row.state === 'available') {
    return 'green';
  }
  return '';
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
// const showModal = false;
// defineComponent({
//   setup() {
//     return {
//       showModal: ref(false)
//     };
//   }
// });
</script>

<style scoped>
:deep(.green td.state) {
  color: rgb(28 201 41 / 75%) !important;
}
:deep(td.state) {
  color: rgb(201 28 28 / 75%) !important;
}
</style>
