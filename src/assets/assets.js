import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile-icon.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Nurlan Tolegenov',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Nurlan — terapevt so stazhem, spetsializiruetsya na obsledovanii i lechenii khronicheskikh zabolevaniy. Osoboe vnimanie udelyaet profilaktike i zdorovomu obrazu zhizni.',
        fees: 8000,
        address: {
            line1: 'Ul. Abaya, 12',
            line2: 'Almaty, Kazakhstan'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Aigerim Sadykova',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Aigerim — vrach-ginekolog, kotoryy vedet patsientok s razlichnymi ginekologicheskimi problemami. Osoboe vnimanie — zdorovye zhenshchin v period beremennosti i posle rodov.',
        fees: 10000,
        address: {
            line1: 'Prospekt Nazarbaeva, 50',
            line2: 'Astana, Kazakhstan'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Yernur Alenov',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Marina — molodoy dermatolog, zanymaetsya lecheniem ugrevoi sypi, atopicheskogo dermatita i drugikh kozhnykh zabolevaniy.',
        fees: 6000,
        address: {
            line1: 'Ul. Kabanbai Batyr, 18',
            line2: 'Shymkent, Kazakhstan'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Yerlan Beketov',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Yerlan — pediatr, spetsializiruetsya na nablyudenii i lechenii detey ot rozhdeniya do 16 let. Ochen vnimatelnyy i kontaktniy vrach.',
        fees: 7000,
        address: {
            line1: 'Ul. Gogolya, 145',
            line2: 'Karaganda, Kazakhstan'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Saule Karimova',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Saule — nevrolog s opytom raboty s bolnymi s migrenyu, insultom i nevrozami. Primenyaet sovremennye metody diagnostiki.',
        fees: 9500,
        address: {
            line1: 'Ul. Respubliki, 5',
            line2: 'Pavlodar, Kazakhstan'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Dmitry Pavlov',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Dmitry — spetsialist po narusheniyam nervnoy sistemy, vedet patsientov s boleznyu Parkinsona i epilepsiey.',
        fees: 9500,
        address: {
            line1: 'Ul. Lenina, 34',
            line2: 'Omsk, Russia'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Timur Alimov',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Timur — opytniy terapevt, provedet polnuyu diagnostiku organizma i podberet individualnoe lechenie.',
        fees: 8000,
        address: {
            line1: 'Ul. Dostyk, 27',
            line2: 'Almaty, Kazakhstan'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Nurbek Rymkul',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Yelena — spetsialist po voprosam zhenskogo zdorovya, konsultiruet po planovoy i ekstrennoy ginekologii.',
        fees: 10000,
        address: {
            line1: 'Ul. Sovetskaya, 11',
            line2: 'Novosibirsk, Russia'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ainur Kaldybaeva',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Ainur — molodoy dermatolog, ispolzuet lazernye i apparatnye metody v lechenii kozhi.',
        fees: 6000,
        address: {
            line1: 'Ul. Baitursynova, 65',
            line2: 'Almaty, Kazakhstan'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Alexey Zorin',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Alexey — vrach-detskaya poliklinika, provodit planovye osmotry i vaktsinatsiyu detey.',
        fees: 7000,
        address: {
            line1: 'Ul. Pervomayskaya, 22',
            line2: 'Kazan, Russia'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zhanel Sarsembayeva',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zhanel — opytniy nevrolog, rabotaet s patsientami s vegeto-sosudistymi narusheniyami i stressom.',
        fees: 9500,
        address: {
            line1: 'Ul. Satpaeva, 44',
            line2: 'Aktobe, Kazakhstan'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Ruslan Ibragimov',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Ruslan — nevrolog, spetsializiruetsya na lechenii postinsultnyh sostoyaniy i radikulita.',
        fees: 9500,
        address: {
            line1: 'Ul. Tole Bi, 19',
            line2: 'Taraz, Kazakhstan'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Madina Zhaksylykova',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Madina — terapevt, provodit kompleksnye obsluzhivaniya i sovetuet po voprosam immuniteta i pitaniya.',
        fees: 8000,
        address: {
            line1: 'Ul. Abylaikhan, 38',
            line2: 'Kostanay, Kazakhstan'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Anastasiya Ivanova',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Anastasiya — vrach-ginekolog, vedet zhenskie konsultatsii, predostavlyaet podderzhku v period beremennosti.',
        fees: 10000,
        address: {
            line1: 'Ul. Mira, 9',
            line2: 'Ekaterinburg, Russia'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Aizhan Nurtayeva',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Aizhan — spetsialist po estetskoy dermatologii, zanymaetsya lecheniem akne, pigmentatsii i omolozheniem.',
        fees: 6000,
        address: {
            line1: 'Ul. Kunaeva, 25',
            line2: 'Almaty, Kazakhstan'
        }
    },
];

