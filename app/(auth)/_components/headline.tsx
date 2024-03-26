
import Image from 'next/image';

interface HeadLineProps {

}

export const HeadLine = ({ }: HeadLineProps) => {
    
    return (
        <>
            <Image
                src={"/login.svg"}
                alt="Authentication Image"
                width={ 500}
                height={500}
                className='object-cover w-full h-full  max-h-[500px]'
            />
        </>
        
    )
}

