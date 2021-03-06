<template>
  <div class="enrolled-course-page">
    <div class="header" v-if="courseMeta">{{ course.code }}: {{ course.title }}</div>
    <hr>
    <DiscussionInput
      class="new-post"
      placeholder="Post something..."
      actionLabel="Post"
      v-model="post"
      @submit="savePost"
    />
    <hr class="line">
    <div v-if="threads">
      <DiscussionThread v-for="thread in threads" :key="thread.guid"
        class="thread"
        :discussion="thread"
      />
    </div>
  </div>
</template>

<script>
import DiscussionThread from '@/library/DiscussionThread';
import DiscussionInput from '@/library/DiscussionInput';

export default {
  props: {
    courseGuid: { type: String, required: true },
  },
  data() {
    return { post: '' };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.discussions.dispatch('reloadCourseThreads', this.courseGuid);
      this.$store.courses.dispatch('reloadCourseMeta', this.courseGuid);
    },
    savePost(post) {
      this.$store.discussions.dispatch('storeNewPost', { post, courseGuid: this.courseGuid });
    }
  },
  computed: {
    threads() {
      return this.$store.discussions.getters.courseThreads[this.courseGuid];
    },
    courseMeta() {
      return this.$store.courses.getters.courseMeta[this.courseGuid];
    },
    course() {
      return this.courseMeta.enrollment;
    },
  },
  watch: {
    courseGuid() {
      this.loadData();
    }
  },
  components: {
    DiscussionThread,
    DiscussionInput
  }
}
</script>

<style lang="scss" scoped>
.enrolled-course-page {
  padding: var(--m);

  .line {
    margin: var(--xxs) 0;
  }

  .thread {
    margin-top: var(--xl);
  }

  .header {
    font-family: 'PT Serif';
    font-size: var(--m);
    color: var(--color1);
    line-height: var(--xxxl);
    display: inline-block;
  }
}

@media only screen and (max-width: $small-screen-breakpoint) {
  .enrolled-course-page {
    padding: var(--xxxxs);
  }
}
</style>
