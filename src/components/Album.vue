<template>
    <div>
        test
        {{ nameAlbum }}
    </div>
</template>

<script>
    export default {
        name: 'Album',
        props: {
            nameAlbum: String
        }
    }
</script>