import Image from 'next/image';

export default function StepComponent(picture: string, header: string, text: string) {
    return(
        <div>
            <Image src={picture} alt={picture} height={400} width={400} />
            <h1>{header}</h1>
            <p>{text}</p>
        </div>
    );
}