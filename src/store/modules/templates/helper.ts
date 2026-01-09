import type { PageData } from '../editor/helper'

export type TemplateProps = Required<Omit<PageData, 'props' | 'setting'>>

export interface TemplatesProps {
  data: TemplateProps[];
  totalTemplates: number;
  works: TemplateProps[];
  totalWorks: number;
}