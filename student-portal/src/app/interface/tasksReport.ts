export interface TasksReport {
    id: string;
    work_id: string;
    title: string;
    content: string;
    timestamp: string;
    data: string;
    time: string;
    completed: boolean;
    tagged_line_manager_ids: string[];
}