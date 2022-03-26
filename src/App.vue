<template>

  <nav class="blue-grey darken-1">
    <div class="nav-wrapper">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 100%;">
        <span style="font-size: 1rem">
          Калькулятор для расчета нагрузки на оси самолета
        </span>
      </div>
    </div>
  </nav>

  <main class="container">
    <div class="row calc">
      <div class="col s12 m8 offset-m2 l6 offset-l3 z-depth-2">
        <div class="input-field col s12">
          <select class="icons" v-model="plane">
            <option :value="null" selected>Тип самолета</option>
            <option v-for="item of planes" :key="item[0]" :data-icon="`/images/${item[1].image}.jpg`" :value="item[0]">
              {{ item[1].type }}
            </option>
          </select>
        </div>
        <TransitionGroup>
          <div class="col s12 row valign-wrapper" v-if="plane != null">
            <div class="input-field col s2">
              Вес
            </div>
            <div class="input-field col s10">
              <input type="text" id="weight" :value="weight" class="validate" disabled>
            </div>
          </div>
          <div class="input-field col s12 row center-align" v-if="plane != null">
            <h6>Отсеки</h6>
            <v-checkbox
                :switchClass="['col', 's3']"
                v-for="section of sections"
                :label="section.name"
                :key="section.name"
                v-model="section.value"
            />
          </div>
          <div class="input-field col s12" v-if="plane != null">
            <select>
              <option value="" disabled selected>Тип упаковки</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
          <div class="col s12" v-if="plane != null">
            <label>
              <input type="checkbox" v-model="partialLoading">
              <span>Частичная погрузка</span>
            </label>
          </div>
        </TransitionGroup>

        <div class="col s12 row">
          <a :class="[
              'btn',
              'waves-effect',
              'waves-light',
              'btn-large',
              'blue-grey',
              'darken-1',
              'col',
              's12',
              'modal-trigger',
              plane == null ? 'disabled' : ''
          ]"
             href="#modal"
          >
            Рассчитать
            <i class="material-icons right">send</i>
          </a>
        </div>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="modal" class="modal">
      <div class="modal-content">
        <h4>Результат</h4>

      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Закрыть</a>
      </div>
    </div>
  </main>

  <footer class="page-footer blue-grey darken-1">
    <div class="footer-copyright">
      <div class="container">
        © {{ year }}
      </div>
    </div>
  </footer>

</template>

<script>
import materialCss from 'materialize-css';
import Airplane from "@/Entity/Airplane";

import vCheckbox from "@/components/v-checkbox"

export default {
  name: 'App',
  data() {
    return {
      plane: null,
      sections: [
        {
          name: 'Отсек A',
          value: false
        },
        {
          name: 'Отсек B',
          value: false
        },
        {
          name: 'Отсек C',
          value: false
        },
        {
          name: 'Отсек D',
          value: false
        },
      ],
      partialLoading: false
    }
  },
  components: {
    vCheckbox
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    planes() {
      let plains = [
        {
          type: 'Боинг 737-400F',
          image: 'boeing',
          sections: [],
          capacity: 128500
        },
        {
          type: 'ИЛ-76МД-90А',
          image: 'il',
          sections: [],
          capacity: 60000
        }
      ]

      let airplanes = new Map()
      for (let plain in plains) {
        airplanes.set(plain, new Airplane(plains[plain]))
      }

      return airplanes
    },
    weight() {
      let planes = this.planes,
          plane = planes.has(this.plane) ? this.planes.get(this.plane) : null
      console.log({planes}, this.plane, planes.get(this.plane))
      return plane ? plane.capacity : 0
    }
  },
  mounted() {
    materialCss.AutoInit()
  }
}
</script>

<style lang="scss">
@import './assets/scss/style.scss';
</style>
