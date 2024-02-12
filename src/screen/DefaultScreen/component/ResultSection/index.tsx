/* eslint-disable prefer-rest-params */
import { useState } from 'react'
import classNames from 'classnames'
import { Select, Option, Avatar } from '@mui/joy'
import Badge from '@mui/joy/Badge'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SendIcon from '@mui/icons-material/Send'
import EmailIcon from '@mui/icons-material/Email'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { IUser } from '~root/types'

interface IResultSectionProps {
    userList: IUser[]
}

function intersection(list: string[][]) {
    const result = []
    let lists: string | IArguments | any[]

    if (list.length === 1) {
        lists = list[0]
    } else {
        lists = list
    }

    for (let i = 0; i < lists.length; i++) {
        const currentList = lists[i]
        for (let y = 0; y < currentList.length; y++) {
            const currentValue = currentList[y]
            if (result.indexOf(currentValue) === -1) {
                let existsInAll = true
                for (let x = 0; x < lists.length; x++) {
                    if (lists[x].indexOf(currentValue) === -1) {
                        existsInAll = false
                        break
                    }
                }
                if (existsInAll) {
                    result.push(currentValue)
                }
            }
        }
    }
    return result
}

type TOption = 'Just for fun' | 'More serious'
type TAvailabilityOption = 'All' | 'This week' | 'Next week' | 'Best week' | 'None'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 16,
        padding: '10px',
    },
}))

// Challenge 2 (User’s Availability Results Function)
export default function ResultSection(props: IResultSectionProps) {
    const { userList } = props
    const [option, setOption] = useState<TOption>('Just for fun')
    const [selectedWeek, setSelectedWeek] = useState<any>()
    const [availabilityOption, setAvailabilityOption] = useState<TAvailabilityOption | undefined>(
        'All',
    )

    const handleChangeOption = () => {
        setOption((currentOption) => {
            if (currentOption === 'Just for fun') {
                return 'More serious'
            }
            return 'Just for fun'
        })
    }

    const handleChangeAvailabilityOption = (newOption: TAvailabilityOption) => {
        setAvailabilityOption(newOption)
        setSelectedWeek(undefined)
    }

    const filterUserByOption = (userList: IUser[]) => {
        if (availabilityOption === 'All') {
            return userList
        }
        if (availabilityOption === 'This week') {
            return userList.filter((user) => user.availability.includes('Week 1'))
        }
        if (availabilityOption === 'Next week') {
            return userList.filter((user) => user.availability.includes('Week 2'))
        }
        if (availabilityOption === 'Best week') {
            if (userList.length > 1) {
                const listOfUserAvailability = userList.map((user) => user.availability)
                const bestWeeks = intersection(listOfUserAvailability)
                return userList.filter((user) =>
                    user.availability.some((week) => bestWeeks.includes(week)),
                )
            } else {
                return userList
            }
        }
    }

    const changeAvailabilityByOption = (user: IUser) => {
        if (availabilityOption === 'This week') {
            return 'Week 1'
        } else if (availabilityOption === 'Next week') {
            return 'Week 2'
        } else if (availabilityOption === 'Best week') {
            if (userList.length > 1) {
                const listOfUserAvailability = userList.map((user) => user.availability)
                return intersection(listOfUserAvailability).join(', ')
            } else {
                return user.availability.join(', ')
            }
        } else {
            return user.availability.join(', ')
        }
    }

    const filterByWeek = (week: string) => {
        return userList.filter((user) => user.availability.includes(week))
    }

    const Options = (
        <>
            <div
                className={classNames('px-4 py-3  rounded-md cursor-pointer hover:bg-slate-100', {
                    'bg-slate-100': option === 'Just for fun',
                })}
                onClick={handleChangeOption}
            >
                Just for fun
            </div>
            <div
                className={classNames(
                    'px-4 py-3  rounded-md cursor-pointer hover:bg-slate-100 ml-4',
                    {
                        'bg-slate-100': option === 'More serious',
                    },
                )}
                onClick={handleChangeOption}
            >
                More serious
            </div>
        </>
    )

    const AvailabilityOptionList = (
        <>
            <div
                className={classNames(
                    'col-span-1 flex items-center justify-center cursor-pointer',
                    {
                        'bg-blue-400 rounded-md': availabilityOption === 'All',
                    },
                )}
                onClick={() => handleChangeAvailabilityOption('All')}
            >
                <p>All ({userList.length})</p>
            </div>
            <div
                className={classNames(
                    'col-span-1 flex items-center justify-center cursor-pointer',
                    {
                        'bg-blue-400 rounded-md': availabilityOption === 'This week',
                    },
                )}
                onClick={() => handleChangeAvailabilityOption('This week')}
            >
                <p>
                    This week (
                    {userList.filter((user) => user.availability.includes('Week 1')).length})
                </p>
            </div>
            <div
                className={classNames(
                    'col-span-1 flex items-center justify-center cursor-pointer',
                    {
                        'bg-blue-400 rounded-md': availabilityOption === 'Next week',
                    },
                )}
                onClick={() => handleChangeAvailabilityOption('Next week')}
            >
                <p>
                    Next week (
                    {userList.filter((user) => user.availability.includes('Week 2')).length})
                </p>
            </div>
            <div
                className={classNames(
                    'col-span-1 flex items-center justify-center cursor-pointer',
                    {
                        'bg-blue-400 rounded-md': availabilityOption === 'Best week',
                    },
                )}
                onClick={() => handleChangeAvailabilityOption('Best week')}
            >
                <p>
                    Best week (
                    {userList.filter((user) => user.availability.includes('Week 7')).length})
                </p>
            </div>
        </>
    )

    const FilteredUserList = () => {
        if (selectedWeek) {
            return filterByWeek(selectedWeek).map((user) => (
                <li
                    key={user.username}
                    className='grid grid-cols-7 px-8 hover:bg-slate-100 last:border-none border-b-[1px] border-solid border-black/20'
                >
                    <div className='col-span-2 flex items-center justify-start py-3'>
                        <Badge
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            badgeInset='8%'
                            color='success'
                            size='sm'
                        >
                            <Avatar alt={user.username} src={user.imageUrl} size='sm' />
                        </Badge>

                        <p className='ml-4 hover:text-blue-400 cursor-pointer'>{user.username}</p>
                    </div>
                    <div className='col-span-3 flex items-center justify-start mr-10'>
                        <span className='h-full flex items-center '>
                            <p>{changeAvailabilityByOption(user)}</p>
                        </span>
                    </div>
                    <div className='col-span-2 flex items-center justify-start'>
                        <LightTooltip title='View profile' placement='top-start' arrow>
                            <div className='p-2 bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-md flex items-center justify-center'>
                                <VisibilityIcon fontSize='small' color='primary' />
                            </div>
                        </LightTooltip>

                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                            <SendIcon fontSize='small' color='disabled' />
                        </div>
                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                            <EmailIcon fontSize='small' color='disabled' />
                        </div>
                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                            <ChatBubbleIcon fontSize='small' color='disabled' />
                        </div>
                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                            <PersonRemoveIcon fontSize='small' color='disabled' />
                        </div>
                    </div>
                </li>
            ))
        } else {
            return filterUserByOption(userList)?.map((user) => (
                <li
                    key={user.username}
                    className='grid grid-cols-7 px-8 hover:bg-slate-100 last:border-none border-b-[1px] border-solid border-black/20'
                >
                    <div className='col-span-2 flex items-center justify-start py-3'>
                        <Badge
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            badgeInset='8%'
                            color='success'
                            size='sm'
                        >
                            <Avatar alt={user.username} src={user.imageUrl} size='sm' />
                        </Badge>

                        <p className='ml-4 hover:text-blue-400 cursor-pointer'>{user.username}</p>
                    </div>
                    <div className='col-span-3 flex items-center justify-start mr-10'>
                        <span className='h-full flex items-center '>
                            <p>{changeAvailabilityByOption(user)}</p>
                        </span>
                    </div>
                    <div className='col-span-2 flex items-center justify-start'>
                        <LightTooltip title='View profile' placement='top-start' arrow>
                            <div className='p-2 bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-md flex items-center justify-center'>
                                <VisibilityIcon fontSize='small' color='primary' />
                            </div>
                        </LightTooltip>

                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                            <SendIcon fontSize='small' color='disabled' />
                        </div>
                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                            <EmailIcon fontSize='small' color='disabled' />
                        </div>
                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                            <ChatBubbleIcon fontSize='small' color='disabled' />
                        </div>
                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                            <PersonRemoveIcon fontSize='small' color='disabled' />
                        </div>
                    </div>
                </li>
            ))
        }
    }

    return (
        <div className='w-3/5 bg-white rounded-lg mb-10 py-6 shadow'>
            <div className='flex flex-col items-center px-10'>
                <h4 className=' font-bold text-xl text-orange-400 mb-5'>USER BEST FRIENDS</h4>
                <div className='w-full flex items-center'>{Options}</div>
                <div className='mt-4 w-full flex flex-col'>
                    <div className='grid grid-cols-7 px-4 py-4 border-[1px] border-solid border-black/20 rounded-md'>
                        <div className='col-span-1 flex items-center justify-center'>
                            <p>Availability</p>
                        </div>
                        {AvailabilityOptionList}
                        <div className='col-span-2 flex justify-center items-center pl-4'>
                            <Select
                                placeholder='Select week'
                                name=''
                                required
                                sx={{ minWidth: 200 }}
                                size='sm'
                                onChange={(e, newValue) => {
                                    setSelectedWeek(newValue)
                                    setAvailabilityOption(undefined)
                                }}
                            >
                                <Option value='Week 1'>Week 1</Option>
                                <Option value='Week 2'>Week 2</Option>
                                <Option value='Week 3'>Week 3</Option>
                                <Option value='Week 4'>Week 4</Option>
                                <Option value='Week 5'>Week 5</Option>
                                <Option value='Week 6'>Week 6</Option>
                                <Option value='Week 7'>Week 7</Option>
                            </Select>
                        </div>
                    </div>
                    <div className='mt-4 rounded-md overflow-hidden border-[1px] border-solid border-black/20'>
                        <div className='bg-blue-400 grid grid-cols-7 px-8 py-4 '>
                            <div className='col-span-2 flex items-center justify-start'>
                                <p>Friends</p>
                            </div>
                            <div className='col-span-3 flex justify-start items-center'>
                                <p>Availability</p>
                            </div>
                            <div className='col-span-2 flex justify-start items-center'>
                                <p>Action Options</p>
                            </div>
                        </div>
                        <ul className='last:border-none'>
                            {/* {filterUserByOption(userList)?.map((user) => (
                                <li
                                    key={user.username}
                                    className='grid grid-cols-7 px-8 hover:bg-slate-100 last:border-none border-b-[1px] border-solid border-black/20'
                                >
                                    <div className='col-span-2 flex items-center justify-start py-3'>
                                        <Badge
                                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                            badgeInset='8%'
                                            color='success'
                                            size='sm'
                                        >
                                            <Avatar
                                                alt={user.username}
                                                src={user.imageUrl}
                                                size='sm'
                                            />
                                        </Badge>

                                        <p className='ml-4 hover:text-blue-400 cursor-pointer'>
                                            {user.username}
                                        </p>
                                    </div>
                                    <div className='col-span-3 flex items-center justify-start mr-10'>
                                        <span className='h-full flex items-center '>
                                            <p>{changeAvailabilityByOption(user)}</p>
                                        </span>
                                    </div>
                                    <div className='col-span-2 flex items-center justify-start'>
                                        <LightTooltip
                                            title='View profile'
                                            placement='top-start'
                                            arrow
                                        >
                                            <div className='p-2 bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-md flex items-center justify-center'>
                                                <VisibilityIcon fontSize='small' color='primary' />
                                            </div>
                                        </LightTooltip>

                                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                                            <SendIcon fontSize='small' color='disabled' />
                                        </div>
                                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                                            <EmailIcon fontSize='small' color='disabled' />
                                        </div>
                                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                                            <ChatBubbleIcon fontSize='small' color='disabled' />
                                        </div>
                                        <div className='p-2 bg-slate-200 rounded-md flex items-center justify-center ml-2'>
                                            <PersonRemoveIcon fontSize='small' color='disabled' />
                                        </div>
                                    </div>
                                </li>
                            ))} */}
                            {FilteredUserList()}
                            {userList.length === 0 && (
                                <div className='flex items-center justify-center p-6'>
                                    <p>No user found</p>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
