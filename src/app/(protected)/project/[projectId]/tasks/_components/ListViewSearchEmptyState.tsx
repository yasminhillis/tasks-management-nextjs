import SearchOffIcon from '@/components/icons/SearchOffIcon';

export default function ListViewSearchEmptyState() {
  return (
    <tr>
      <td colSpan={5}>
        <div className="flex flex-col items-center justify-center gap-4 h-[280px]">
          <SearchOffIcon />
          <h4 className="flex items-center gap-2">No search sesults found</h4>
        </div>
      </td>
    </tr>
  );
}
