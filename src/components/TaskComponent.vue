<script setup>
import { useTaskStore } from '@/stores/tasks'
import { ref } from 'vue'
import ModalComponent from '@/components/ModalComponent.vue'

const taskStore = useTaskStore();
const props = defineProps(['task'])
const modalActive = ref(false);
const updateDialog = ref(false);
const title = ref();
const completed = ref(props.task.is_complete);
const date = ref(props.task.inserted_at.substr(0, 10));
const year = ref(date.value.slice(0, 4));
const month = ref(date.value.slice(5, 7));
const day = ref(date.value.slice(8, 10))
const deleteSubmit = async () => {
    await taskStore.deleteTask(props.task)
    modalActive.value = !modalActive.value
}
const updateTask = async () => {
    await taskStore.updateTask(props.task, title.value)
    title.value = ''
    updateDialog.value = false;
}
const completedTask = async () => {
    await taskStore.completeTask(props.task, !completed.value)
    completed.value = !completed.value
}
</script>
<template>
    <div>
        <li class="list-group-item list-group-item-action p-0" :data-completed="task.is_complete">
            <div class="d-flex flex-row justify-content-between align-items-center ">
                <div class="p-2 d-flex flex-row justify-content-between align-items-center gap-3">
                    <!--COMPLETED/INCOMPLETED BUTTON-->
                    <button @click="completedTask" class="btn rounded-circle p-0 d-inline-flex check-btn"><lord-icon
                            src="https://cdn.lordicon.com/jvihlqtw.json" :trigger="task.is_complete ? 'click' : 'hover'"
                            colors="primary:#228B22,secondary:#228B22" stroke="300" state="hover-2"
                            style="width: 25px;px;height:25px">
                        </lord-icon></button>
                    <div class="p-2 flex-row">
                        <p class="fs-6 m-0" :class="task.is_complete ? 'text-decoration-line-through' : ''">{{ task.title }}
                        </p>
                        <p class="fw-lighter fs-6 m-0">{{ day }}/{{ month }}/{{ year }}</p>
                    </div>
                </div>
                <div class="p-2 flex-row">
                    <!--UPDATE BUTTON-->
                    <button @click="updateDialog = !updateDialog" class="btn p-0" data-bs-toggle="modal"
                        data-bs-target="#updateModal"> <lord-icon src="https://cdn.lordicon.com/bxxnzvfm.json"
                            trigger="hover" colors="primary:#228B22,secondary:#FFA07A,tertiary:#228B22,quaternary:#FFFF00"
                            state="hover-2" style="width:60px;height:60px">
                        </lord-icon> </button>

                    <!-- DELETE BUTTON-->
                    <button @click="modalActive = !modalActive" class="btn p-0" type="button"><lord-icon
                            src="https://cdn.lordicon.com/qjwkduhc.json" trigger="hover"
                            colors="primary:#228B22,secondary:#228B22,tertiary" state="hover-empty"
                            style="width:60px;height:60px">
                        </lord-icon>
                    </button>
                </div>
            </div>
            <!--DELETE DIALOG -->
            <ModalComponent :modalActive="modalActive" modalTitle="Delete Task">
                <div class="modal-body">
                    <p>Are you sure do you want to delete?</p>
                </div>
                <div class="modal-footer d-flex justify-content-end">
                    <button @click="deleteSubmit" type="button" class="btn btn-primary align-content-center">Delete
                        <lord-icon src="https://cdn.lordicon.com/jmkrnisz.json" trigger="loop" delay="1000"
                            colors="primary:#228B22" style="width:20px;height:20px">
                        </lord-icon>
                    </button>
                </div>
            </ModalComponent>
            <!-- UPDATE DIALOG -->
            <form @submit.prevent="updateTask" v-show="updateDialog">
                <div class="input-group">
                    <input type="text" placeholder="Edit your task" class="form-control" v-model="title" minlength="4"
                        required />
                    <button class="btn btn-primary ">Submit</button>
                </div>
            </form>
        </li>
    </div>
</template>
<style>
.check-btn {
    border-color: var(--melon);
}
.check-btn * {
    opacity: 0;
}
.closing-btn {
    position: relative;
    left: calc(50% - 200px);
    top: calc(50% - 10px)
}
[data-completed="true"] .check-btn *,
[data-completed="false"] .check-btn:hover * {
    opacity: 1;
}
</style>