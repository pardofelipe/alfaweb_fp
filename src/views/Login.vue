<template>
    <v-container>
        <v-row justify="center">
            <v-col md="6" class="ps-4 pe-4 pb-4 mt-4 block">
                <h2 class="mr-2 mb-6 blue-grey--text">Bienvenid@ a AlfaWeb</h2>
                <v-alert border="left" colored-border color="indigo" elevation="2" class="pl-6 pr-6 pb-6"
                    transition="scale-transition">
                    <h4 class="mb-4">
                        <v-icon>mdi-login-variant</v-icon> Iniciar sesión
                    </h4>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="email" :rules="emailRules" label="Correo" required></v-text-field>
                        <v-text-field v-model="pass" :rules="passRules" label="Contraseña" required type="password">
                        </v-text-field>
                        <v-btn light small color="indigo" class="mr-4 mt-4 white--text" @click="login"  :disabled="!valid">
                            <v-icon>mdi-login-variant</v-icon> Ingresar
                        </v-btn>
                        <v-btn light small color="indigo lighten-2" class="mr-4 mt-4 white--text" @click="reset">
                            <v-icon>mdi-refresh</v-icon> Borrar
                        </v-btn>
                        <h5 class="mt-4" color="grey lighten-1">
                            No tienes una cuenta? <router-link to="/signup">Haz click aquí</router-link>
                        </h5>
                    </v-form>
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {mapActions} from "vuex"
export default {
    name: 'login-view',
    // props: {},
    data: function(){
        return {
      valid: true,
      pass: '',
      passRules: [
        (v) => !!v || 'Contraseña es requerido',
        (v) =>
          (v && v.length <= 6) || 'Contraseña debe contener al menos 6 caracteres',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'Correo es requerido',
        (v) => /.+@.+\..+/.test(v) || 'Correo debe ser valido',
      ],
    }
    },
    // computed: {},
    methods: {
      ...mapActions(['set_user']),
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    login() {
      this.validate()
      if (this.valid == false) return //escapar de la funcion

      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.email, this.pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log(user)
          this.set_user(this.email)
          this.$router.push('/')

          // ...
        })
        .catch((error) => {
          //const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)

        })
    },
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