import { useState } from 'react'
import AddUserAvailabilitySection from './component/AddUserAvailabilitySection'
import ResultSection from './component/ResultSection'
import { IUser } from '~root/types'

export default function ChallengesScreen() {
    const [userList, setUserList] = useState<IUser[]>([])

    const handleAddUser = (user: IUser) => {
        setUserList((currentList) => [...currentList, user])
    }

    return (
        <div className='w-full flex flex-col items-center py-10'>
            <ResultSection userList={userList} />
            <AddUserAvailabilitySection addUser={handleAddUser} />
        </div>
    )
}
