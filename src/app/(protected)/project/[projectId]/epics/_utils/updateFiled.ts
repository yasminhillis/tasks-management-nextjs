import { updateEpic } from "@/lib/actions/epicActions";

type handleFieldUpdateProps = {
    epicId: string,
    field: 'title' | 'description' | 'assignee_id' | 'deadline' | 'assignee',
    previousValue: string,
    currentValue: string,
    onSuccess: (value: string) => void,
    onRevert: (value: string, message: string) => void
}

export default async function updateFiled({ epicId, field, previousValue, currentValue, onSuccess, onRevert }: handleFieldUpdateProps) {
    if (previousValue === currentValue) return;
    try {
        const valueToSave = currentValue === "" ? null : currentValue
        const result = await updateEpic({ data: { [field]: valueToSave }, epicId })
        if (result.success) {
            onSuccess(currentValue)
        } else {
            onRevert(previousValue, result.message)
        }
    } catch (error) {        
        onRevert(previousValue, "Network error. Please try again")
    }
}