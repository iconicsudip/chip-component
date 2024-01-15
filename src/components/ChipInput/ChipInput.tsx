import { useEffect, useRef, useState } from "react"
import { UserBox } from "../UserBox"
import './chipinput.css'
import { T_UserBoxProps } from "../../types/userbox.types"
import { User } from "../User";
import USER_LIST from "../../user-data.json";
const userList = USER_LIST
export default function ChipInput() {
    const [selectedUsers, setSelectedUsers] = useState<Array<T_UserBoxProps> | []>([]);
    const inputRef = useRef(null);
    const [chipValue, setChipValue] = useState<string>('');
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [showChipList, setShowChipList] = useState<boolean>(false);
    const [currentUserList, setCurrentUserList] = useState<Array<T_UserBoxProps> | []>(userList);
    const setOnCancel = (id: string) => {
        const currentUsers = selectedUsers.filter((user: T_UserBoxProps) => {
            return user._id !== id;
        })
        const currentUser = userList.filter((user: T_UserBoxProps) => {
            return user._id === id;
        })
        setSelectedUsers(currentUsers);
        setCurrentUserList([
            ...currentUserList,
            ...currentUser
        ]);
    }
    const handleChipChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChipValue(e.target.value);
        if (e.target.value.length > 0) {
            const filteredUsers = userList.filter((user: T_UserBoxProps) => {
                return user.name.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setCurrentUserList(filteredUsers);
        } else {
            setCurrentUserList(userList);
        }
    }
    const handleSelectUser = (user: T_UserBoxProps) => {
        if(chipValue === ""){
            const currentUsers = currentUserList.filter((currentUser:T_UserBoxProps) => {
                return currentUser._id !== user._id;
            })
            setSelectedUsers([...selectedUsers, user]);
            setChipValue('');
            setCurrentUserList(currentUsers);
        }else{
            const data = [...selectedUsers, user]
            const currentList = userList.filter((currentUser: T_UserBoxProps) => {
                return !data.includes(currentUser);
            });
            setSelectedUsers([...selectedUsers, user]);
            setChipValue('');
            setCurrentUserList(currentList);
        }
    }
    const handleChipFocus = () => {
        setShowChipList(true)
        setIsInputFocused(true);
    }
    const handleChipBlur = () => {
        setIsInputFocused(false);
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!isInputFocused) {
                setShowChipList(false);
            }
        }, 200);

        return () => clearTimeout(timeoutId);
    }, [isInputFocused]);
    return (
        <div className="chipbox">
            <div className="chip_wrapper">
                {selectedUsers.length > 0 && 
                    <div className="chips">
                        {selectedUsers?.map((user) => {
                            return <UserBox key={user?._id} user={user} setOnCancel={setOnCancel} />
                        })}
                    </div>
                }
                
                <div className="chipinput_box"
                    ref={inputRef}
                    onFocus={handleChipFocus}
                    onBlur={handleChipBlur}
                    >
                    <input
                        type="text"
                        placeholder="Search to add"
                        value={chipValue}
                        onChange={handleChipChage}
                        
                    />
                    {showChipList &&
                        <div className="chipinput_list">
                            {currentUserList?.map((user) => {
                                return <div onClick={() => handleSelectUser(user)}><User key={user?._id} user={user}  /></div>
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
