<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useUserStore } from '../stores/user';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const schema = yup.object().shape({
    password: yup.string().min(6, 'Minimum length is 6 characters').required('This field is required!'),
    confirmPassword: yup.string().required('This field is required!').oneOf([yup.ref('password')], 'Passwords do not match')
})
const userStore = useUserStore();
const error = ref();
const router = useRouter();
const showPassword = ref(false);

const submit = async (value) => {
    console.log(value.password)
    error.value = '';
    try {
        await userStore.updatePassword(value.password)
        router.push('/tasks')
    } catch (err) { error.value = err.message; }
}
</script>
<template>
    <div class="card card-max-width">
        <div class="p-5">
            <h4 class="card-title">Set a new password</h4>
            <Form @submit="submit" :validation-schema="schema">
                <div class="mb-3">
                    <label for="input-password" class="form-label"> Password</label>
                    <div class="input-group">
                        <Field id="input-password" name="password" :type="[showPassword ? 'text' : 'password']"
                            placeholder="Password" class="form-control" />
                        <button class="btn btn-outline-secondary inpout-group-text" @click="showPassword = !showPassword">
                            <i class="bi" :class="[showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill']"></i>
                        </button>
                    </div>
                    <ErrorMessage name="password" class="form-text text-danger" />
                </div>
                <div class="mb-3">
                    <label for="input-confirmPassword" class="form-label">Repeat password</label>
                    <div class="input-group">
                        <Field id="input-confirmPassword" name="confirmPassword"
                            :type="[showPassword ? 'text' : 'password']" placeholder="Repeat password"
                            class="form-control" />
                        <button class="btn btn-outline-secondary inpout-group-text" @click="showPassword = !showPassword">
                            <i class="bi" :class="[showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill']"></i>
                        </button>
                    </div>
                    <ErrorMessage name="confirmPassword" class="form-text text-danger" />
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </Form>
        </div>
    </div>
</template>
