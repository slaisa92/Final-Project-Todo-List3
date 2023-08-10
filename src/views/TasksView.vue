<template>
    <div class="card card-max-width h-100">

        <div class=" p-3 p-sm-5 d-flex flex-column h-100">
            <h4 class="card-title mb-4"> Welcome, <br>
                {{ userStore.user.email }}! </h4>
            <form @submit.prevent="addSubmit" class="mb-4">
                <div class="input-group">
                    <input type="text" placeholder="Add your new task" class="form-control" v-model="title" minlength="4"
                        required />
                    <button type="submit" class="btn btn-primary z-0">Add Task</button>
                </div>
            </form>
            <div id="tabs" class="flex-grow-1 d-flex flex-column" style="min-height: 0;">
                <ul class="nav nav-tabs nav-fill">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                            type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                            type="button" role="tab" aria-controls="profile-tab-pane"
                            aria-selected="false">Completed</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane"
                            type="button" role="tab" aria-controls="contact-tab-pane"
                            aria-selected="false">Incompleted</button>
                    </li>

                </ul>
                <div id="content-tabs" class="flex-grow-1 overflow-auto" style="min-height: 0;">
                    <ul class="list-group">
                        <div class="tab-content list-group" id="myTabContent">
                            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel"
                                aria-labelledby="home-tab" tabindex="0">
                                <TaskComponent :task="task" v-for="task in taskStore.allTasks" />
                            </div>
                            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
                                tabindex="0">
                                <TaskComponent :task="completed" v-for="completed in taskStore.completedTasks" />

                            </div>
                            <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab"
                                tabindex="0">
                                <TaskComponent :task="incompleted" v-for="incompleted in taskStore.incompletedTasks" />
                            </div>
                            <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab"
                                tabindex="0">...</div>
                        </div>
                    </ul>
                </div>
            </div>

        </div>


    </div>
</template>

<script setup>

import { useTaskStore } from '@/stores/tasks'
import { onMounted, ref } from 'vue';

import TaskComponent from '../components/TaskComponent.vue';
import { useUserStore } from '../stores/user';



const taskStore = useTaskStore();
const userStore = useUserStore();



const title = ref();


onMounted(async () => {
    await taskStore.fetchTasks()
}
)

const addSubmit = async () => {
    await taskStore.addTask(title.value)
    title.value = '';
}

</script>

