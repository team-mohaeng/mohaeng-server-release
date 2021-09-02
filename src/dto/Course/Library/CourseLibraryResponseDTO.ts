export default interface CourseLibraryResponseDTO {
  status: number;
  data: TotalCourseResponseDTO;
}

export interface TotalCourseResponseDTO {
  isProgress: boolean;
  courses: SimpleCourseResponseDTO[];
}

export interface SimpleCourseResponseDTO {
  id: number;
  situation: number;
  property: number;
  title: string;
  description: string;
  totalDays: number;
  year: string;
  month: string;
  date: string;
}