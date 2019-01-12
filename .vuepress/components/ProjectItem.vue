<template>
  <div class="container">
    <div class="tags-and-link">
      <div class="tags">
        <div v-for="tag in tags" :key="tag" class="tag">{{tag}}</div>
      </div>
      <div class="link" v-if="urlLink">
        <a slot="link" target="_blank" :href="urlLink">
          <span>{{urlText}}</span>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px"
            viewBox="0 0 100 100" width="15" height="15">
            <path fill="currentColor"
              d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v
              -8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
            </path>
            <polygon fill="currentColor"
              points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2
              85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
            </polygon>
          </svg>
        </a>
      </div>
    </div>
    <div class="description">
      <slot name="description"></slot>
    </div>
    <div class="image">
      <slot name="image"></slot>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',
  props: ['tags', 'urlLink', 'urlText'],
};
</script>

<style scoped>

.container {
  padding: 0 0 20px 0;
}

.tags-and-link {
  display: flex;
  justify-content: space-between;
  padding: 10px 0 0 0;
}

.tags-and-link a {
  font-size: 20px;
}

.link {
}

.tags {
  display: flex;
  margin: 0 0 12px 0;
  flex-wrap: wrap;
}

.tag {
  background-color: #499be7;
  color: white;
  font-size: 13px;
  border-radius: 3px;
  padding: 2px 6px;
  margin: 3px;
}

.description {
  text-align: justify;
  padding: 0 0 10px 0;
}

.image {
  min-width: 100%;
}

</style>
