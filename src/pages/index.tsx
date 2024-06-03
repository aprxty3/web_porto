import Container from "@/components/Container";
import {useEffect, useRef, Suspense, useState} from "react";
import styles from "@/styles/Home.module.css";
import {Button} from "@/components/ui/button";
import {
    ChevronRight,
    Code2,
    Frame,
    Eye,
    MonitorSmartphone,
} from "lucide-react";
import {TriangleDownIcon} from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import {cn, scrollTo} from "@/lib/utils";
import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import {motion} from "framer-motion";


const projects = [
    {
        title: "Ai Care Partner",
        description: "Ai Care for Partners",
        image: "/assets/aicare_partner.jpeg",
        href: "https://play.google.com/store/apps/details?id=net.atmatech.hcp.doctor",
    },
    {
        title: "Ai Care User",
        description: "Ai Care a healthcare app",
        image: "/assets/ai_care_user.png",
        href: "https://play.google.com/store/apps/details?id=net.atmatech.hcp",
    },
    {
        title: "Callink",
        description: "Callink chat apps",
        image: "/assets/callink.png",
        href: "https://callink.id/",
    },
    {
        title: "Padat Karya Mangrove",
        description: "Padat Karya Mangrove is app for monitoring mangrove",
        image: "/assets/pkm.png",
        href: "https://www.karomap.com/",
    },
    // {
    //     title: "Checkervisor",
    //     description: "Checkervisor is app for check original product",
    //     image: "/assets/checkvisor.png",
    //     href: "https://www.instagram.com/checkervisor/",
    // },
    {
        title: "SWUSHD Kitchen",
        description: "SWUSHD Kitchen is a mobile apps for ordering food",
        image: "/assets/swushd.png",
        href: "https://swushd.com/",
    },
    {
        title: "This website",
        description: "My personal website",
        image: "/assets/web_porto.png",
        href: "https://github.com/aprxty3/web_porto",
    },
];

const aboutStats = [
    {label: "Years of experience", value: "3+"},
    {label: "Projects handled", value: `${projects.length}`},
    {label: "Companies worked with", value: "4+"},
];

const services = [
    {
        service: "Mobile Development",
        description:
            "Creating stellar user interfaces and mobile experiences using the latest technologies.",
        icon: Code2,
    },
    {
        service: "Responsive Design",
        description:
            "Designing apps that look and perform equally well on Android and iOS.",
        icon: MonitorSmartphone,
    },
    {
        service: "UX Design",
        description:
            "Building intuitive, user-centric designs that drive engagement and conversion.",
        icon: Frame,
    },
    {
        service: "UX Research",
        description:
            "Research the best practice design for the user experience",
        icon: Eye,
    },
    // {
    //     service: "Backend Development",
    //     description:
    //         "Developing robust, scalable server-side logic for a wide range of applications.",
    //     icon: Eye,
    // },
];

const experiences = [
    {
        companyName: "PT. Digital Sekuriti Indonesia",
        jobType: "Full-time",
        jobTitle: "Mobile Developer",
        duration: "2022 - Present",
        description:
            "Developed and maintained mobile applications company products, like Callink, Ai Care, and AI Care for Partners with GetX State Management and DDD Modular Clean Architecture. also, I'm responsible for research any tools or newest of technology to apply or implement on the projects",

    },
    {
        companyName: "CV. Karomap Semesta",
        jobType: "Freelance",
        jobTitle: "Flutter Developer",
        duration: "Aug 2023 - Jan 2024",
        description:
            "Development mobile apps who named Padat Karya Mangrove, this app is monitoring mangrove in Indonesia. I'm responsible for developing the app from scratch to production",
    },
    {
        companyName: "SWUSHD Ltd",
        jobType: "Freelance",
        jobTitle: "Flutter Developer",
        duration: "Mar - July 2023",
        description:
            "Fix and solve bugs on the SWUSHD Kitchen app, implement Github Action for CI/CD, also integrated the apps ith Stipe for payment gateway",
    },
    {
        companyName: "Axar School",
        jobType: "Full-time",
        jobTitle: "Research and Development",
        duration: "Nov 2020 - Nov 2021",
        description:
            "Reseach and analyst an IoT and Mobile Apps (flutter) modul, and develop the modul for the student",
    },
    {
        companyName: "Diponegoro University",
        jobType: "Part-time",
        jobTitle: "IT Engineer (SEO)",
        duration: "May - Dec 2020",
        description:
            "Optimize the website for SEO, develop the website for the university, and help standarize the website for the university",
    },
    {
        companyName: "Gets id",
        jobType: "Part-time",
        jobTitle: "UX Researcher",
        duration: "Jul - Dec 2020",
        description:
            "Research and identify to Improve a UI/UX in the Application, Created a Social Media Content, Created a Win-Win Solution to Business Partner and Researching Competitors.",
    },
];

export default function Home() {
    const refScrollContainer = useRef(null);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    // handle scroll
    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");

        async function getLocomotive() {
            const Locomotive = (await import("locomotive-scroll")).default;
            new Locomotive({
                el: refScrollContainer.current ?? new HTMLElement(),
                smooth: true,
            });
        }

        function handleScroll() {
            let current = "";
            setIsScrolled(window.scrollY > 0);

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 250) {
                    current = section.getAttribute("id") ?? "";
                }
            });

            navLinks.forEach((li) => {
                li.classList.remove("nav-active");

                if (li.getAttribute("href") === `#${current}`) {
                    li.classList.add("nav-active");
                    console.log(li.getAttribute("href"));
                }
            });
        }

        void getLocomotive();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!carouselApi) return;

        setCount(carouselApi.scrollSnapList().length);
        setCurrent(carouselApi.selectedScrollSnap() + 1);

        carouselApi.on("select", () => {
            setCurrent(carouselApi.selectedScrollSnap() + 1);
        });
    }, [carouselApi]);

    // card hover effect
    useEffect(() => {
        const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
        VanillaTilt.init(tilt, {
            speed: 300,
            glare: true,
            "max-glare": 0.1,
            gyroscope: true,
            perspective: 900,
            scale: 0.9,
        });
    }, []);

    return (
        <Container>
            <div ref={refScrollContainer}>
                <Gradient/>

                {/* Intro */}
                <section
                    id="home"
                    data-scroll-section
                    className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
                >
                    <div className={styles.intro}>
                        <div
                            data-scroll
                            data-scroll-direction="horizontal"
                            data-scroll-speed=".09"
                            className="flex flex-row items-center space-x-1.5"
                        >
                            <span className={styles.pill}>Flutter</span>
                            <span className={styles.pill}>Kotlin</span>
                            <span className={styles.pill}>C++ (IoT)</span>
                            <span className={styles.pill}>Firebase</span>
                            <span className={styles.pill}>Supabase</span>
                        </div>
                        <div>
                            <h1
                                data-scroll
                                data-scroll-enable-touch-speed
                                data-scroll-speed=".06"
                                data-scroll-direction="horizontal"
                            >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br/>
                </span>
                                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Aji Prasetyo.
                </span>
                            </h1>
                            <p
                                data-scroll
                                data-scroll-enable-touch-speed
                                data-scroll-speed=".06"
                                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
                            >
                                An experienced mobile dev engineer with a passion for
                                crafting unique digital experiences.
                            </p>
                        </div>
                        <span
                            data-scroll
                            data-scroll-enable-touch-speed
                            data-scroll-speed=".06"
                            className="flex flex-row items-center space-x-1.5 pt-6"
                        >
              <Link href="mailto:d.ajiprasetyo43@gmail.com" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4"/>
                </Button>
              </Link>
              <Button
                  variant="outline"
                  onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

                        <div
                            className={cn(
                                styles.scroll,
                                isScrolled && styles["scroll--hidden"],
                            )}
                        >
                            Scroll to discover{" "}
                            <TriangleDownIcon className="mt-1 animate-bounce"/>
                        </div>
                    </div>
                    <div
                        data-scroll
                        data-scroll-speed="-.01"
                        id={styles["canvas-container"]}
                        className="mt-14 h-full w-full xl:mt-0"
                    >
                        <Suspense fallback={<span>Loading...</span>}>
                            <Spline scene="/assets/scene.splinecode"/>
                        </Suspense>
                    </div>
                </section>

                {/* About */}
                <section id="about" data-scroll-section>
                    <div
                        data-scroll
                        data-scroll-speed=".4"
                        data-scroll-position="top"
                        className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
                    >
                        <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
                            I&apos;m an experienced mobile dev engineer proficient in{" "}
                            <Link
                                href="https://flutter.dev/"
                                target="_blank"
                                className="underline"
                            >
                                Flutter
                            </Link>{" "}
                            and {" "}
                            <Link
                                href="https://kotlinlang.org/"
                                target="_blank"
                                className="underline"
                            >
                                Kotlin
                            </Link>{" "}
                            since 2021 and want Expand on{" "} <Link
                            href="https://www.swift.org/"
                            target="_blank"
                            className="underline"
                        >
                            Swift
                        </Link>{""}
                            . My experience spans from startups to mid-sized
                            companies, where I&apos;ve been instrumental in the entire product
                            design process; from ideation and wireframing, through
                            prototyping, to the delivery of the final product, all while
                            efficiently collaborating with cross-functional teams.
                        </h2>
                        <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
                            {aboutStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center text-center xl:items-start xl:text-start"
                                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                                    <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Experiences */}
                <section id="experiences" data-scroll-section>
                    {/* Gradient */}
                    <div className="relative isolate -z-10">
                        <div
                            className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
                            aria-hidden="true"
                        >
                            <div
                                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                style={{
                                    clipPath:
                                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                                }}
                            />
                        </div>
                    </div>
                    <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Experiences
            </span>
                        <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                            Work experiences.
                        </h2>
                        <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                            I&apos;ve worked on a variety of jobs, from :
                            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                        </p>
                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
                            {experiences.map((experience, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                                >
                                    <h3 className="text-lg tracking-tight text-foreground">
                                        {experience.jobTitle}
                                        <span
                                            className="text-gray-500  ml-2">({experience.jobType || "Placeholder"})</span>

                                    </h3>
                                    <p className="mt-2 tracking-tighter text-muted-foreground">{experience.companyName}</p>
                                    <p className="mt-2 tracking-tighter text-muted-foreground">{experience.duration}</p>
                                    <p className="mt-2 tracking-tighter text-muted-foreground">{experience.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section id="projects" data-scroll-section>
                    {/* Gradient */}
                    <div className="relative isolate -z-10">
                        <div
                            className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
                            aria-hidden="true"
                        >
                            <div
                                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                style={{
                                    clipPath:
                                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                                }}
                            />
                        </div>
                    </div>
                    <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
                        <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                            Streamlined digital experiences.
                        </h2>
                        <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                            I&apos;ve worked on a variety of projects, from small to
                            large-scale mobile applications. Here are some of my projects:
                        </p>

                        {/* Carousel */}
                        <div className="mt-14">
                            <Carousel setApi={setCarouselApi} className="w-full">
                                <CarouselContent>
                                    {projects.map((project) => (
                                        <CarouselItem key={project.title} className="md:basis-1/2">
                                            <Card id="tilt">
                                                <CardHeader className="p-0">
                                                    <Link href={project.href} target="_blank" passHref>
                                                        {project.image.endsWith(".webm") ? (
                                                            <video
                                                                src={project.image}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                                                            />
                                                        ) : (
                                                            <Image
                                                                src={project.image}
                                                                alt={project.title}
                                                                width={600}
                                                                height={300}
                                                                quality={100}
                                                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                                                            />
                                                        )}
                                                    </Link>
                                                </CardHeader>
                                                <CardContent
                                                    className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                                                    <CardTitle
                                                        className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                                                        {project.description}
                                                    </CardTitle>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious/>
                                <CarouselNext/>
                            </Carousel>
                            <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                                projects
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section id="services" data-scroll-section>
                    <div
                        data-scroll
                        data-scroll-speed=".4"
                        data-scroll-position="top"
                        className="my-24 flex flex-col justify-start space-y-10"
                    >
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{
                                duration: 1,
                                staggerChildren: 0.5,
                            }}
                            viewport={{once: true}}
                            className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
                        >
                            <div className="flex flex-col py-6 xl:p-6">
                                <h2 className="text-4xl font-medium tracking-tight">
                                    Need more info?
                                    <br/>
                                    <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                                </h2>
                                <p className="mt-2 tracking-tighter text-secondary-foreground">
                                    Here are some of the services I offer. If you have any
                                    questions, feel free to reach out.
                                </p>
                            </div>
                            {services.map((service) => (
                                <div
                                    key={service.service}
                                    className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                                >
                                    <service.icon className="my-6 text-primary" size={20}/>
                                    <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                                    <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" data-scroll-section className="my-64">
                    <div
                        data-scroll
                        data-scroll-speed=".4"
                        data-scroll-position="top"
                        className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
                    >
                        <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
                            Let&apos;s work{" "}
                            <span className="text-gradient clash-grotesk">together.</span>
                        </h2>
                        <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                            I&apos;m currently available for freelance work and open to
                            discussing new projects.
                        </p>
                        <div className="flex">
                            <Link href="mailto:d.ajiprasetyo43@gmail.com" passHref>
                                <Button className="mt-6">
                                    <Image src='/assets/mail.svg' alt="Mail" width={20} height={20}/>
                                </Button>
                            </Link>

                            <Button className="mt-6 ml-4"
                                    onClick={() => window.open('https://t.me/Aprxty', '_blank')}>
                                <Image src='/assets/telegram.svg' alt="Telegram" width={20} height={20}/>
                            </Button>

                            <Button className="mt-6 ml-4"
                                    onClick={() => window.open('https://www.linkedin.com/in/ajiprasetyo43/', '_blank')}>
                                <Image src='/assets/linkedin.svg' alt="LinkedIn" width={20} height={20}/>
                            </Button>

                            <Button className="mt-6 ml-4"
                                    onClick={() => window.open('https://github.com/aprxty3', '_blank')}>
                                <Image src='/assets/github.svg' alt="Github" width={20} height={20}/>
                            </Button>


                        </div>
                    </div>
                </section>
            </div>
        </Container>
    );
}

function Gradient() {
    return (
        <>
            {/* Upper gradient */}
            <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <svg
                    className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                    viewBox="0 0 1155 678"
                >
                    <path
                        fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                        fillOpacity=".1"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    />
                    <defs>
                        <linearGradient
                            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                            x1="1155.49"
                            x2="-78.208"
                            y1=".177"
                            y2="474.645"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#7980fe"/>
                            <stop offset={1} stopColor="#f0fff7"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Lower gradient */}
            <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                    className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                    viewBox="0 0 1155 678"
                >
                    <path
                        fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                        fillOpacity=".1"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    />
                    <defs>
                        <linearGradient
                            id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                            x1="1155.49"
                            x2="-78.208"
                            y1=".177"
                            y2="474.645"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#9A70FF"/>
                            <stop offset={1} stopColor="#838aff"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </>
    );
}
