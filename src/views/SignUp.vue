<template>
    <v-container>
        <v-row justify="center">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <v-col md="6" class="ps-4 pe-4 pb-4 mt-4 block">
                <h2 class="mr-2 mb-6 blue-grey--text">Únete a AlfaWeb</h2>
                <v-alert border="left" colored-border color="cyan lighten-2" elevation="2" class="pl-6 pr-6 pb-6"  transition="scale-transition">
                    <h4 class="mb-4"><v-icon>mdi-account-plus</v-icon> Crea tu cuenta</h4>
                
                    <v-text-field v-model="register.email" label="Ingresa tu correo" required></v-text-field>
                    <v-text-field v-model="register.password" label="Ingresa tu contraseña" required type="password">
                    </v-text-field>
                    <v-btn light small color="cyan lighten-2" class="mr-4 mt-4 white--text" @click="nuevoUsuario">
                       <v-icon>mdi-account-plus</v-icon> Crear cuenta
                    </v-btn>
                    <v-btn light small color="indigo lighten-2" class="mr-4 mt-4 white--text">
                        <v-icon>mdi-refresh</v-icon> Borrar
                    </v-btn>
                    <h5 class="mt-4">
                        Volver al <router-link to="/login"  color="grey lighten-1">inicio</router-link>
                    </h5>
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {mapActions} from "vuex"
export default {
    name: 'Signup-view',
    // props: {},
    data: function(){
         return { register: { email: "", password: "" },
    }
    },
    // computed: {},
     methods: {
        async nuevoUsuario() {
        const { email, password } = this.register;
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
         this.set_user(email)
        this.$router.push("/");
        },
        ...mapActions(['set_user']),
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