<script setup>
import { ref } from "vue";
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";

const isSignUp = ref(false);
</script>

<template>
    <div class="d-flex justify-content-center">
        <button @click="isSignUp = !isSignUp" class="btn btn-primary btn-sm alert alert-warning" role="alert">
            {{
                isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account yet? Sign Up"
            }}
        </button>
    </div>
    <SignUpView v-if="isSignUp" />
    <SignInView v-else />
</template>