import { updateEpic } from "@/lib/actions/epicActions";

type handleFieldUpdateProps = {
    epicId: string,
    field: 'title' | 'description' | 'assignee' | 'deadline',
    previousValue: string,
    currentValue: string,
    onSuccess: (value: string) => void,
    onRevert: (value: string, error: "fetch failed" | "network error") => void
}

export default async function updateFiled({ epicId, field, previousValue, currentValue, onSuccess, onRevert }: handleFieldUpdateProps) {
    if (previousValue === currentValue) return;
    try {
        const valueToSave = currentValue === "" ? null : currentValue
        const result = await updateEpic({ data: { [field]: valueToSave }, epicId })
        if (result.success) {
            onSuccess(currentValue)
        } else {
            onRevert(previousValue, "fetch failed")
        }
    } catch (error) {
        console.log('network rorr here');
        
        onRevert(previousValue, "network error")
    }
}