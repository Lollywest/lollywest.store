import { Metadata } from "next"
import Image from "next/image"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
// import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/layouts/main-nav"
// import { Overview } from "@/app/examples/dashboard/components/overview"
// import { RecentSales } from "@/app/examples/dashboard/components/recent-sales"
// import { Search } from "@/app/examples/dashboard/components/search"
// import TeamSwitcher from "@/app/examples/dashboard/components/team-switcher"
// import { UserNav } from "@/components/layouts/user-nav"
import { Shell } from "@/components/shells/shell"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { db } from "@/db"
import { products, artists } from "@/db/schema"
import { and, eq, not } from "drizzle-orm"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"





export const metadata: Metadata = {
    title: "Purchased Wrap Page",
    description: "",
}


interface PurchasedWrapPageProps {
    params: {
        productId: string
    }
}

export default function PurchasedWrapPage({ params }: PurchasedWrapPageProps) {
    const productId = Number(params.productId)

    // const product = await db.query.products.findFirst({
    //     where: eq(products.id, productId),
    // })


    // if (!product) {
    //     notFound()
    // }

    return (
        <Shell className="md:pb-10">
            <div className="space-y-8">

                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Artist Wrap Dashboard</h2>
                        <div className="flex items-center space-x-2 ">
                            {/* <CalendarDateRangePicker /> */}
                            <Button className="rounded-xl">Contact Artist</Button>
                        </div>
                    </div>
                    <Tabs defaultValue="overview" className="space-y-4 ">
                        <TabsList className="rounded">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="announcements" >
                                Announcements
                            </TabsTrigger>
                            {/* <TabsTrigger value="reports" disabled>
                                    Reports
                                </TabsTrigger>
                                <TabsTrigger value="notifications" disabled>
                                    Notifications
                                </TabsTrigger> */}
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-2 rounded-xl">
                                    {/* <CardHeader>
                                            <CardTitle>Artist Name</CardTitle>
                                        </CardHeader> */}
                                    <CardContent className=" p-0 ">
                                        {/* <Overview /> */}
                                        {/* <section className="mx-auto w-full justify-center overflow-hidden rounded-lg"> */}
                                        <div >
                                            <Image
                                                className="rounded-xl"
                                                src="/images/Delete-Example-Pic.png"
                                                alt=""
                                                height={1000}
                                                width={1000}
                                            />
                                        </div>
                                        {/* </section> */}

                                    </CardContent>
                                </Card>
                                <Card className="col-span-5 rounded-xl">
                                    <CardHeader>
                                        <CardTitle>Upcoming</CardTitle>
                                        <CardDescription>
                                            Upcoming Artist Events
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <UpcomingEvents /> */}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card className="rounded-xl">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Monthly Perk 1
                                        </CardTitle>
                                        {/* <Badge variant="destructive">VIP</Badge> */}
                                        <Badge>In-Person</Badge>
                                        {/* <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Backstage Passes</div>
                                        <p className="text-xs text-muted-foreground">
                                            Link or something
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="rounded-xl">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Monthly Perk 2
                                        </CardTitle>
                                        <Badge variant="secondary">Online</Badge>
                                        {/* <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Exclusive AMA</div>
                                        <p className="text-xs text-muted-foreground">
                                            Link or Something
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="rounded-xl">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Monthly Perk 3</CardTitle>
                                        <Badge variant="secondary">Online</Badge>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Game with Artist</div>
                                        <p className="text-xs text-muted-foreground">
                                            Link or Something
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="rounded-xl">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Monthly Perk 4
                                        </CardTitle>
                                        <Badge >In-Person</Badge>
                                        {/* <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Exculsive Event</div>
                                        <p className="text-xs text-muted-foreground">
                                            Link or something
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>


                        <TabsContent value="announcements" className="space-y-4">

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                                <Card className="col-span-7 rounded-xl p-4">
                                    <CardHeader className="p-2">
                                        <CardTitle>Artist Announcements</CardTitle>
                                        <CardDescription>
                                            Artist Announcements & Notifications
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <UpcomingEvents /> */}
                                    </CardContent>

                                    <section className="grid gap-2">
                                        <div>
                                            <Card className="rounded-xl ">
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                                                    <CardTitle className="text-sm font-medium">
                                                        Date: XX/XX/XXXX
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-xl font-bold pb-1.5">Announcement Title</div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Description description description description description description description description
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div>
                                            <Card className="rounded-xl ">
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                                                    <CardTitle className="text-sm font-medium">
                                                        Date: XX/XX/XXXX
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-xl font-bold pb-1.5">Announcement Title</div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Description description description description description description description description
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div>
                                            <Card className="rounded-xl ">
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                                                    <CardTitle className="text-sm font-medium">
                                                        Date: XX/XX/XXXX
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-xl font-bold pb-1.5">Announcement Title</div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Description description description description description description description description
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </section>
                                </Card>
                            </div>


                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </Shell>
    )
}