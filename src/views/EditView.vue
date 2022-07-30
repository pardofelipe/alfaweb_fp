<template>
    <v-app>
        <v-main>
            <v-container class="mt-6">
                <v-row>
                    <v-col>
                        <h4 class="mt-2 mb-6">
                            <v-icon>mdi-book</v-icon> Editar Curso
                        </h4>
                    </v-col>
                </v-row>
                <v-row class="white">
                    <v-col cols="12" sm="12" md="4" lg="12">
                        <!--vForm-->
                        <v-toolbar-title>Estás en el Curso: <i class="blue--text accent-3">{{editItem.topic}}</i></v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-form v-model="valid" ref="form">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="6" lg="3">
                                        <v-text-field v-model="editItem.topic" :counter="30" label="Nombre curso" :rules="requireRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="3" lg="3">
                                        <v-text-field v-model="editItem.image" label="URL Imagen" :rules="requireRules" required>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="3" lg="3">
                                        <v-text-field type="number" v-model="editItem.quota" label="Cupos" :rules="requireRules" required id="quota"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="3" lg="3">
                                        <v-text-field type="number" v-model="editItem.enrolled" label="Alumnos inscritos" :rules="quotaVerified" required id="enrolled"> 
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="3">
                                        <v-text-field v-model="editItem.duration" label="Duración del curso" :rules="requireRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="3" lg="3">
                                        <v-text-field type="number" v-model="editItem.cost" label="Costo" :rules="requireRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="3" lg="3">
                                        <v-text-field type="date" v-model="editItem.date" label="Fecha inicio" :rules="requireRules" required>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="3" lg="3">
                                         <v-switch v-model="editItem.finished" label="Terminado" class="mt-2"></v-switch>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="6" rows="1" row-height="15">
                                        <v-textarea name="input-7-1" label="Descripción del curso"  v-model="editItem.detail" hint="Temas a tratar en el curso" ></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-row>
                                     <v-col cols="12" md="6" lg="6" rows="1" row-height="15">
                                        <v-btn :disabled="!valid" color="blue darken-2 white--text" class="mr-4" @click.prevent="editCourse" > <v-icon>mdi-content-save</v-icon> Guardar edición </v-btn>
                                        <v-btn color="blue-grey lighten-1 white--text" class="mr-4" to="/admin"> <v-icon>mdi-redo</v-icon> Volver </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                        <!--fin_vform-->
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { db } from '@/firebase/firebase.js'
import {getDoc, doc, updateDoc} from 'firebase/firestore'
export default {
    name: 'edit-view',
    props: {
        id:{type:String}
    },
    data: function () {
        return {
            valid: false,
            form: {
                topic: '',
                image: '',
                quota: '',
                enrolled: '',
                duration: '',
                cost: '',
                finished: '',
                date: '',
            },
            editedIndex: -1,
            editItem: {
                topic: '',
                image: '',
                quota: '',
                enrolled: '',
                duration: '',
                cost: '',
                finished: '',
                date: '',
                detail: '',
            },
            requireRules: [(v) => !!v || 'Campo es requerido'],
        }
    },
    computed: {
        ...mapState(['courses']),
        quotaVerified(){
            if(this.editItem.quota >= this.editItem.enrolled) 
            return true
            return ["La cantidad de inscritos no debe superar la cantidad de cupos."]
        },
    },
    methods: {
        ...mapActions(['fetchCourses']),
        async fetchCoursesById() {
            const docRef = doc(db, 'courses', this.id)
            let response = await getDoc(docRef)
            console.log(response)
            this.editItem = response.data()
        },
        //Editar curso
        async editCourse() {
            try {
            await updateDoc(doc(db, 'courses', this.id), this.editItem)
            alert('El curso ha sido actualizado.')
            this.$router.push('/admin/')
            } catch (error) {
            console.log(error);
            }
        }
    },
    created() {
        this.fetchCoursesById()
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