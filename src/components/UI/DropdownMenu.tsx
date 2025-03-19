interface DropdownMenuProps {
  items: {
    label: string
    path: string
  }[]
}

// TODO
// Dropdown Menu

const DropdownMenu = ({ items }: DropdownMenuProps) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.path}>{item.label}</div>
      ))}
    </div>
  )
}
export default DropdownMenu
