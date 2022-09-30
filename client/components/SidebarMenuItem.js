import Link from 'next/link'

export default function SidebarMenuItem({ text, Icon, active }) {
    return (
      <Link href={`/${text.toLowerCase()}`}>
        <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
          <Icon className="" 
          sx={{
            color: "#f98b88",
            fontSize: 35
          }}/>
          <span className={`${active && "font-bold"} hidden xl:inline text-lg`}>{text}</span>
        </div>
      </Link>
    );
}