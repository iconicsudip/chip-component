import './user.css'
import { T_UserBoxProps } from '../../types/userbox.types'
interface UserProps {
    user: T_UserBoxProps
}
export default function User({ user }: UserProps) {
    return (
        <div className='user_box'>
            <div className="user_details">
                <img src={user?.avatar} alt={`${user.name} Image`} />
                <p>{user?.name}</p>
            </div>
            <p className="user_email">{user.email}</p>
        </div>
    )
}
