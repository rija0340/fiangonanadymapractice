import { parsers, format } from "date-fns";


export const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    // Supposons que dateString est au format ISO (e.g., "2023-07-28T00:00:00.000Z")
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
};