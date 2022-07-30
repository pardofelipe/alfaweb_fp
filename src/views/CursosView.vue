<template>
  <v-app>
    <v-main>
      <v-container class="mt-6">
        <v-row>
          <v-col>
            <h4 class="mt-2 mb-6">
              <v-icon>mdi-book</v-icon> Cursos Alfaweb
            </h4>
          </v-col>
          <v-col>
            <v-btn light small color="cyan lighten-2" class="mr-4 mt-4 white--text float-right mdi-18px"
              @click="$router.push('admin')">
              <v-icon>mdi-book-plus</v-icon> Administrar cursos
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="space-around">
          <v-col cols="12" sm="12" md="4" lg="4" v-for="course in courses" :key="course.id">
          <!--vCard-->
            <v-card width="400">
              <v-img height="180px" :src="course.image"></v-img>
              <v-card-text>
                <div class="font-weight-bold ml-8 mb-2">
                 <h2 class="mb-3">{{course.topic}}</h2>
                </div>
                <div class="font-weight-bold ml-8 mb-2">
                Información
                </div>
                <v-timeline align-top dense>
                  <v-timeline-item color="deep-purple lighten-1" small>
                    <div>
                      <div class="font-weight-normal">Costo: <strong>${{ course.cost }}</strong> </div>
                      <div>Duración: {{ course.duration }}</div>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="green" small>
                    <div>
                      <div class="font-weight-normal">Cupos: <strong>{{ course.quota }}</strong> </div>
                      <div>Completado: {{ course.finished }}</div>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="deep-purple lighten-1" small>
                    <div>
                      <div class="font-weight-normal">Fecha de Registro</div>
                      <div>{{ course.date }}</div>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="green" small>
                    <div>
                      <div class="font-weight-bold">Descripción: {{ course.detail }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
                </v-card-text>
            </v-card>
            <!--fin_vCard-->
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'cursos-view',
  props: ['idCourse'],
  data: () => ({
    
  }),
  computed: {
    ...mapState(['courses'])
  },
  methods: {
    ...mapActions(['fetchCourses'])
  },
  created() {
    this.fetchCourses()
  }
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