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
        <v-select
            v-model="plane"
            :containerClass="['col s12']"
            :options="planes"
            label="Тип самолета"
        />
        <Transition>
          <div v-if="plane != null">
            <div class="col s12 row center-align">
              <h6 style="margin-top: 0;">Отсеки</h6>
              <v-checkbox
                  :containerClass="['col', 's3']"
                  v-for="[key, section] of sections"
                  :label="section.name"
                  :key="key"
                  v-model="section.value"
              />
            </div>

            <v-select
                v-model.number="packageType"
                :containerClass="['col s12']"
                :options="packageTypes"
                label="Тип упаковки"
            />

            <div class="col s12 row valign-wrapper">
              <label for="weight" class="input-field col s3">
                Вес, кг
              </label>
              <div class="input-field col s9">
                <input
                    type="number"
                    step="1"
                    min="0"
                    :max="maxWeight"
                    id="weight"
                    class="validate"
                    v-model="weight"
                >
              </div>
            </div>

            <div class="col s12">
              <label>
                <input type="checkbox" v-model="partialLoading">
                <span>Частичная погрузка</span>
              </label>
            </div>

          </div>
        </Transition>

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
    <div id="modal" class="modal s6">
      <div class="modal-content">
        <h4>Результат</h4>
        <table class="striped highlight">
          <tbody>
          <tr>
            <td>Тип самолета</td>
            <td>{{ planes.get(plane) }}</td>
          </tr>
          <tr>
            <td>Вес</td>
            <td>
              <span class="tooltip tooltipped" data-position="bottom" data-tooltip="Загружено">
                {{ weight }}
              </span>
              /
              <span class="tooltip tooltipped" data-position="bottom" data-tooltip="Свободно">
                {{ maxWeight - weight }}
              </span>
              /
              <span class="tooltip tooltipped" data-position="bottom" data-tooltip="Всего">
                {{ maxWeight }}
              </span>
            </td>
          </tr>
          <tr v-for="[key, section] of activeSections" :key="key">
            <td>
              {{ section.name }}
            </td>
            <td>

              <span class="tooltip tooltipped" data-position="bottom" data-tooltip="Загружено">
                {{ Math.ceil(weight / activeSections.size) }}
              </span>
              /
              <span class="tooltip tooltipped" data-position="bottom" data-tooltip="Свободно">
                {{ maxWeight / sections.size - Math.ceil(weight / activeSections.size) }}
              </span>
              /
              <span class="tooltip tooltipped" data-position="bottom" data-tooltip="Всего">
                {{ maxWeight / sections.size }}
              </span>
            </td>
          </tr>
          <tr v-if="packageType != null">
            <td>Тип упаковки</td>
            <td>{{ packageTypes.get(packageType) }}</td>
          </tr>
          <tr>
            <td>Частичная погрузка</td>
            <td>{{ partialLoading ? 'Да' : 'Нет' }}</td>
          </tr>
          </tbody>
        </table>
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
import vSelect from "@/components/v-select"

export default {
  name: 'App',
  data() {
    return {
      plane: null,
      weight: 0,
      sections: new Map([
        [0, {
          name: 'Отсек A',
          value: false
        }],
        [1, {
          name: 'Отсек B',
          value: false
        }],
        [2, {
          name: 'Отсек C',
          value: false
        }],
        [3, {
          name: 'Отсек D',
          value: false
        }]
      ]),
      packageType: null,
      packageTypes: new Map([
        [0, 'Паллеты'],
        [1, 'Мешки'],
        [2, 'Ящики']
      ]),
      partialLoading: false
    }
  },
  components: {
    vCheckbox,
    vSelect
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
    maxWeight() {
      let planes = this.planes,
          plane = planes.has(this.plane) ? this.planes.get(this.plane) : null
      return plane ? plane.capacity : 0
    },
    activeSections() {
      let active = new Map()
      for (let [key, item] of this.sections) {
        if (item.value) {
          active.set(key, item)
        }
      }
      return active
    }
  },
  watch: {
    weight() {
      if (this.weight < 0) {
        this.weight = 0
      } else if (this.weight > this.maxWeight) {
        this.weight = this.maxWeight
      }

      if (this.weight % 1 !== 0) {
        this.weight = this.weight - (this.weight % 1)
      }
    }
  },
  mounted() {
    materialCss.AutoInit()
  },
  updated() {
    materialCss.AutoInit()
  }
}
</script>

<style lang="scss">
@import './assets/scss/style.scss';
</style>
