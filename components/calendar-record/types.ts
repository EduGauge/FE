export interface CalendarTodo {
  id: string;
  title: string;
  checked: boolean;
  category: string;
}

export interface CalendarRecord {
  date: string;
  progress: number;
  elapsedSeconds: number;
  completed: boolean;
  photo: boolean;
  photoUri?: string;
  todos: CalendarTodo[];
}

export interface CalendarRecordModalProps {
  visible: boolean;
  record: CalendarRecord | null;
  onClose: () => void;
}
