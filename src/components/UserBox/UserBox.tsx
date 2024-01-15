import { T_UserBoxProps } from '../../types/userbox.types'
import { TbX } from "react-icons/tb";
import './userbox.css'

interface UserBoxProps {
    user: T_UserBoxProps,
    setOnCancel: (id: string) => void
}

export default function UserBox({ user, setOnCancel }: UserBoxProps) {
    return (
        <div className='userbox_wrapper'>
            <div className='userbox'>
                <img src={user?.avatar} alt={`${user.name} Image`} />
                <p>{user?.name}</p>
            </div>
            <TbX onClick={() => setOnCancel(user._id)} />
        </div>
    )
}
