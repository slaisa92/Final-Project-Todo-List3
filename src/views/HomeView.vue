<script setup>

import supabase from '../lib/supabase';

const createNewUser = async () => {
    const { data, error } = await supabase.auth.signUp({
        email: 'example@email.com',
        password: 'example-password',
    });

};
</script>

<template>
<H1>Hello</H1>


<button @click="createNewUser">Create new user </button>
</template>


