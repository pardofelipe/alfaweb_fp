<template>
    <div>
        <v-app-bar color="blue-grey darken-4" dark>
            <v-app-bar-nav-icon v-if="isPrivateRoute" @click="drawer = true" color="white"></v-app-bar-nav-icon>
            <div class="d-flex align-center">
                <v-img alt="logo" class="shrink mr-2" contain src="../assets/img/logo.png" transition="scale-transition"
                    width="170" to="/" />
            </div>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="isPrivateRoute">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="elevation-1" color="blue-grey darken-3" dark small style="font-size:.7em;"
                            v-bind="attrs" v-on="on" @click="logout">
                            <span class="text-light">{{currentUser}}</span>
                            <v-icon class="ms-4">mdi-logout-variant</v-icon>
                        </v-btn>
                    </template>
                    <span theme--light>Cerrar Sesión</span>
                </v-tooltip>
            </v-toolbar-items>
        </v-app-bar>
        <v-navigation-drawer color="blue-grey darken-4" dark v-model="drawer" absolute temporary>
            <v-list nav dense class="mt-6">
                <v-list-item-group v-model="group" active-class="blue-grey--text text--accent-4">
                    <v-list-item v-for="route in routes" :key="route.name" @click="redirectTo(route.name)">
                        <v-list-item-icon>
                            <v-icon>{{ route.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ route.title }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import {mapState} from "vuex"
export default {
    name: 'nav-bar',
    // props: {},
    data: function () {
        return {
            dialog: false,
            drawer: false,
            group: null,
            routes: [
                {
                    icon: 'mdi-home',
                    title: 'Inicio',
                    name: 'Home'
                },
                {
                    icon: 'mdi-book',
                    title: 'Cursos',
                    name: 'Cursos'
                },
                {
                    icon: 'mdi-book-plus',
                    title: 'Administrar Cursos',
                    name: 'Admin'
                }
            ]
        }
    },
    computed: {
        isPrivateRoute() {
            if (this.$route.meta.privado) return true
            return false
        },
        ...mapState(['currentUser']),
    },
    methods: {
        redirectTo(nameRoute) {
            this.$router.push({ name: nameRoute })
        },
        logout() {
            const auth = getAuth()
            signOut(auth)
                .then(() => {
                    alert('Haz cerrado tu sesión')
                    this.$router.push('/login')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped>
</style>