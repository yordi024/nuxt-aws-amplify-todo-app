<template>
    <div class="flex flex-col items-center p-8">
        <h1 class="text-4xl mb-4">Todo</h1>
        <form class="flex flex-col items-center divide-y" @submit.prevent="onSubmit">
            <UInput v-model="todo"></UInput>
            <UButton
                type="submit"
                :loading="loading"
                size="sm"
                class="mt-4"
                >
                {{ loading ? 'Loading...' : 'Add Todo' }}
            </UButton>
        </form>
    </div>

    <div class="grid gap-4 mb-10">
        <div v-for="todo in todos" :key="todo.id" class="w-1/2 m-auto">
            <UCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <div class="text-blue-600">{{ todo.content }}</div>
                        <UButton
                            icon="i-heroicons-trash"
                            square
                            color="white"
                            size="2xs"
                            @click="onDelete(todo.id)"
                        />
                    </div>
                </template>

                <div class="text-xs text-gray-400">
                    {{ todo.id }}
                </div>
            </UCard>
        </div>
    </div>
</template>
<script setup lang="ts">
import * as query from '@/src/graphql/queries'
import * as mutations from '@/src/graphql/mutations'

const todo = ref("")

const loading = ref(false)

const { $Amplify } = useNuxtApp()

const { data: todos, refresh } = useAsyncData(async () => {
    const result = await $Amplify.GraphQL.client.graphql({
        query: query.listTodos
    })
    console.log({ result: result.data.listTodos.items })
    return result.data.listTodos.items
})

const onSubmit = async () => {
    if (!todo.value) return

    loading.value = true

    const { data, errors } = await $Amplify.GraphQL.client.graphql({
        query: mutations.createTodo,
        variables: {
            input: { content: todo.value }
        }
    }) 

    console.log({ data })
    loading.value = false
    todo.value = ''
    refresh()
}

const onDelete =async (id: string) => {
    const { data, errors } = await $Amplify.GraphQL.client.graphql({
        query: mutations.deleteTodo,
        variables: {
            input: { id }
        }
    })
    refresh()
}
</script>
<style lang="">
    
</style>