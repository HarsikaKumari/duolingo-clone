import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";
import { Footer } from "@/app/(marketing)/Footer";

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([coursesData, userProgressData]);
  
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>

      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
      <Footer />
    </div>
  );
};

export default CoursesPage;
