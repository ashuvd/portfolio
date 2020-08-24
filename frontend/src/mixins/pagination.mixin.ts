import Vue from 'vue';
import Component from 'vue-class-component';
import axios from '@/utils/axios';
import { ucFirst } from "@/utils/functions";

@Component
export default class Pagination extends Vue {
  private entity: string = '';
  private page: number = 1;
  private pageSize: number = 5;
  private pageCount: number = 0;
  async setupPagination(entity: string) {
    try {
      this.entity = entity;
      this.page = +this.$route.query.page || 1;
      await this.fetchData(this.page);
    } catch (error) {
      console.log(error);
    }
  }
  async pageChangeHandler(page: number) {
    try {
      this.page = page;
      if (+this.$route.query.page !== page) {
        await this.$router.push(`${this.$route.path}?page=${page}`);
      }
      await this.fetchData(page);
    } catch (error) {
      console.log(error);
    }
  }
  async fetchData(page: number): Promise<void> {
    this.$store.commit(`${this.entity}/set${ucFirst(this.entity)}Loading`, true);
    const response = await axios.get(`/${this.entity}?page=${page}&size=${this.pageSize}`);
    this.$store.commit(`${this.entity}/set${ucFirst(this.entity)}Loading`, false);
    this.pageCount = Math.ceil(response.data[this.entity].count / this.pageSize);
    await this.$store.commit(`${this.entity}/set${ucFirst(this.entity)}`, response.data[this.entity].items);
  }
  updateData(action: string, items: any[], id?: number, item?: any): Promise<void> | void {
    if (action === 'del' && items.length > 1 && this.page === this.pageCount) {
      return this.$store.commit(`${this.entity}/deleteOld${ucFirst(this.entity).slice(0, -1)}`, id);
    }
    if (action === 'del' && items.length === 1) {
      this.page = this.page > 1 ? this.page - 1 : 1;
    }
    return this.pageChangeHandler(this.page);
  }
};
