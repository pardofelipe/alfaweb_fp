<template>
    <v-app>
        <v-main>
            <v-container class="mt-6">
                <v-row>
                    <v-col>
                        <h4 class="mt-2 mb-6">
                            <v-icon>mdi-book-plus</v-icon> Administrar cursos
                        </h4>
                    </v-col>
                    <v-container class="table">
                        <v-data-table dense :headers="headers" :items="courses" sort-by="topic" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>Cursos disponibles</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="700px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn depressed class="mb-2" v-bind="attrs" v-on="on">
                                                <v-icon>mdi-plus</v-icon> agregar curso
                                            </v-btn>
                                        </template>
                                        <!--editar-->
                                        <edit-view />
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">Agregar Curso</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" sm="12" md="12">
                                                            <v-text-field v-model="newItem.topic"
                                                                label="Nombre Curso" :rules="requireRules" required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" md="6">
                                                            <v-text-field v-model="newItem.image" label="URL imagen"
                                                                :rules="requireRules" required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" md="6">
                                                            <v-text-field v-model="newItem.quota" label="Total Cupos" :rules="requireRules" required >
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" md="6">
                                                            <v-text-field v-model="newItem.enrolled"
                                                                label="Inscritos" :rules="requireRules" required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" md="6">
                                                            <v-text-field v-model="newItem.duration" label="Duración"
                                                                :rules="requireRules" required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" md="6">
                                                            <v-text-field v-model="newItem.cost" label="Costo"
                                                                :rules="requireRules" required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" md="3">
                                                            <v-text-field type="date" v-model="newItem.date"
                                                                label="Fecha" :rules="requireRules" required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" md="12">
                                                            <v-textarea v-model="newItem.detail" auto-grow
                                                                name="input-3-1" label="Descripción" value="">
                                                            </v-textarea>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" md="6">
                                                            <v-switch v-model="newItem.finished" label="Terminado"
                                                                class="mt-2"></v-switch>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="error darken-1" text @click="close">
                                                    Cancelar
                                                </v-btn>
                                                <v-btn color="grey darken-1" text @click="addCourse">
                                                    Guardar Nuevo Curso
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>                              
                                    <v-dialog v-model="dialogDelete" max-width="500px">
                                        <v-card>
                                            <v-card-title class="text-h5">Deseas eliminar este Curso?
                                            </v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="error darken-1" text @click="closeDelete">Cancelar</v-btn>
                                                <v-btn color="grey darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
                                                <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon color="blue darken-2" small class="mr-2" @click="editItem(item)">
                                    mdi-pencil
                                </v-icon>
                                <v-icon color="error" small @click="deleteItem(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <template v-slot:[`item.cost`]="{ item }">
                                <v-chip color="cyan lighten-2" dark>
                                    ${{ item.cost }}
                                </v-chip>
                            </template>
                            <template v-slot:[`item.finished`]="{ item }">
                                {{ item.finished ? "Si" : "No" }}
                            </template>
                            <template v-slot:[`item.date`]="{ item }">
                                <v-chip color="cyan lighten-2" dark>
                                    {{ item.date }}
                                </v-chip>
                            </template>
                        </v-data-table>
                    </v-container>
                    <v-container>
                        <v-alert dense outlined color="purple" icon="mdi-account-group" loading="true"
                            loading-text="Loading... Please wait">
                            Cantidad total de alumnos permitidos:
                            <strong>{{ total.quota }}</strong> alumnos
                        </v-alert>
                        <v-alert dense outlined color="primary" icon="mdi-account-multiple-check">
                            Cantidad total de alumnos inscritos:
                            <strong>{{ total.enrolled }}</strong> alumnos
                        </v-alert>
                        <v-alert dense outlined color="error" icon="mdi-account-clock">
                            Cantidad total de cupos restantes:
                            <strong>{{ total.quota - total.enrolled }}</strong>
                        </v-alert>
                        <v-alert dense outlined color="pink" icon="mdi-check-all">
                            Cantidad total de cursos terminados:
                            <strong>{{ countFinishedCourse }}</strong>
                        </v-alert>
                        <v-alert dense outlined color="success" icon="mdi-bell-ring">
                            Cantidad total de cursos activos:
                            <strong>{{ countNotFinishedCourse }}</strong>
                        </v-alert>
                        <v-alert dense outlined color="gray" icon="mdi-bell">
                            Cantidad total de cursos:
                            <strong>{{ totalCourses }}</strong>
                        </v-alert>
                    </v-container>
                </v-row>
            </v-container>
        </v-main>
    </v-app>

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { db } from '@/firebase/firebase.js'
import { collection, getDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { } from 'firebase/firestore'
export default {
    name: 'admin-view',
    props: ['idCourse'],
    data: function () {
        return {
            dialog: false,
            dialogDelete: false,
            valid: true,
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
            headers: [
                { text: "Curso", value: "topic", class: "font-weight-bold" },
                { text: "Cupos", value: "quota", align: 'center' },
                { text: "Inscritos", value: "enrolled", align: 'center' },
                { text: "Duración", value: "duration" },
                { text: "Costo", value: "cost", align: 'center' },
                { text: "Terminado", value: "finished", align: 'center' },
                { text: "Fecha", value: "date", align: 'center' },
                { text: 'Acción', align: 'center', value: 'actions', sortable: false },
            ],
            deleteId: null,
            newItem: {
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
    // components:{},
    computed: {
        ...mapGetters(['countFinishedCourse', 'countNotFinishedCourse']),
        ...mapState(['courses']),
        formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Curso' : 'Editar Curso'
        },
        total() {
            let enrolled = 0;
            let quota = 0;
            let finished = 0;
            let active = 0;
            for (let i = 0; i < this.courses.length; i++) {
                enrolled += this.courses[i].enrolled;
                quota += this.courses[i].quota;
                if (this.courses[i].finished) {
                    finished == !finished;
                } else {
                    active == finished;
                }
            }
            return { enrolled, quota, finished, active };
        },
        totalCourses() {
            return this.courses.length;
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    created() {
        this.fetchCourses()
    },

    methods: {
        // initialize() {
        //     this.courses = []
        // },
        ...mapActions(['fetchCourses']),
        async fetchCoursesById() {
            const docRef = doc(db, 'courses', this.idCourse)
            let response = await getDoc(docRef)
            console.log(response)
            this.form = response.data()
        },
        //EditarCurso
        async editItem(item) {
            this.$router.push('/edit/'+item.id)
        },
        //agregar Curso
        async addCourse() {
            // this.$refs.form.validate();
            // if (!this.valid) return;
            try {
            await addDoc(collection(db, "courses"), this.newItem);
            this.dialog = false;
            this.fetchCourses()
            } catch (error) {
            console.log(error);
            }
        },
        //EliminarCurso
        async deleteItem(item) {
            this.dialogDelete = true
            this.deleteId=item.id
        },
        async deleteItemConfirm() { 
            try {
                await deleteDoc(doc(db, 'courses', this.deleteId))
                this.$router.go()
            } catch (error) {
                console.log(error)
            }
            this.closeDelete()
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        }
    }
}
</script>

<style scoped>
.v-chip.v-size--default {
    border-radius: 4px;
    font-size: 14px;
    height: 28px;
    margin: 6px;
}
</style>