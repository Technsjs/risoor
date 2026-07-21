"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { learnTopics } from "@/lib/learn-catalog";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { usePlatformStore } from "@/lib/platform/hooks";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]";

export function InstructorCoursesPage() {
  const { user } = useAuth();
  const { repo, version, refresh } = usePlatformStore();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedMonths, setEstimatedMonths] = useState(6);
  const [topicIds, setTopicIds] = useState<string[]>(["javascript"]);

  const courses = user ? repo.getCoursesByInstructor(user.id) : [];

  function toggleTopic(id: string) {
    setTopicIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function createCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !title.trim() || topicIds.length === 0) return;
    const course = repo.createCourse({
      title: title.trim(),
      description: description.trim(),
      topicIds,
      estimatedMonths,
      instructorId: user.id,
    });
    refresh();
    setShowForm(false);
    setTitle("");
    setDescription("");
    router.push(`/instructor/courses/${course.id}`);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-white">Courses</h1>
          <p className="mt-2 text-sm text-[var(--ade-muted)]">
            Create courses and pick topics from the Learn catalog.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f0f0f]"
        >
          {showForm ? "Cancel" : "New course"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={createCourse}
          className="mt-6 rounded-2xl border border-white/10 bg-[#1a1a1a] p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs text-white/50">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={fieldClass}
                placeholder="Introduction to JavaScript"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs text-white/50">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${fieldClass} min-h-[80px] resize-y`}
                placeholder="What students will learn…"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-white/50">
                Estimated duration (months)
              </label>
              <input
                type="number"
                min={1}
                max={24}
                value={estimatedMonths}
                onChange={(e) => setEstimatedMonths(Number(e.target.value))}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs text-white/50">Topics</p>
            <div className="flex flex-wrap gap-2">
              {learnTopics.map((topic) => {
                const active = topicIds.includes(topic.id);
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    className={`rounded-full px-3 py-1 text-xs transition-colors ${
                      active
                        ? "bg-white text-[#0f0f0f]"
                        : "border border-white/10 text-white/60 hover:border-white/25"
                    }`}
                  >
                    {topic.name}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-full bg-[var(--ade-accent)] px-5 py-2 text-sm font-medium text-white"
          >
            Create course
          </button>
        </form>
      )}

      <div className="mt-8 space-y-3" key={version}>
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/instructor/courses/${course.id}`}
            className="block rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 transition-colors hover:border-white/20"
          >
            <h3 className="font-medium text-white">{course.title}</h3>
            <p className="mt-1 text-sm text-white/50 line-clamp-2">
              {course.description || "No description"}
            </p>
            <p className="mt-2 text-xs text-white/40">
              {course.topicIds.length} topics · {course.estimatedMonths} months
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
