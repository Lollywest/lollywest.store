import { type Metadata } from "next"
import Image from "next/image"
import { db } from "@/db"
import { orders } from "@/db/schema"
import { env } from "@/env.mjs"
import { desc, sql } from "drizzle-orm"

import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Leaderboard",
  description: "See the top users on Lollywest",
}

export default async function Leaderboard() {
  // Need to allow this to work when people change their usernames!
  const topUsers = await db
    .select({
      username: orders.username,
      total_credits: sql<number>`sum(${orders.price})`.mapWith(Number),
    })
    .from(orders)
    .groupBy(orders.username)
    .orderBy(desc(sql`sum(${orders.price})`))
    .limit(50)

  return (
    <Shell className="md:pb-10">
      <div className="space-y-8">
        <div className="mb-4 flex items-center">
          <Header title="Leaderboard" description="Top Fans" />
          <div className="ml-auto font-bold">{"Sponsors"}</div>
        </div>
        {topUsers.map((user, index) => (
          <div key={index} className="flex justify-between">
            <div className="w-1/12 flex items-center">
              <p className="text-xl font-bold">{index + 1}</p>
            </div>
            <div className="flex w-3/12 items-center">
              <div className="w-5/12 space-y-1">
                <p className="truncate text-lg font-medium leading-none">
                  {user.username || "Anonymous"}
                </p>
                {/* <p className="text-sm text-muted-foreground">
                  {user.top_artist}
                </p> */}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {/* Render the Star Icon for all users */}
                {index < 9999999 && (
                  <Image
                    className="h-7 w-7"
                    src="/images/avatar/verified1.svg"
                    width={256}
                    height={256}
                    alt="verified"
                  />
                )}
                {/* Render the Verification Icon for users in the top 10 */}
                {index < 10 && (
                  <Image
                    className="h-7 w-7"
                    src="/images/avatar/topaz.svg"
                    width={256}
                    height={256}
                    alt="verified"
                  />
                )}

                {index === 0 && (
                  <Image
                    className="h-8 w-8"
                    src="/images/avatar/pyramid.svg"
                    width={256}
                    height={256}
                    alt="verified"
                  />
                  // <svg
                  //   className=" h-9 w-9"
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   viewBox="0 0 512 512"
                  //   fill="#e0c200"
                  //   stroke="#e0c200"
                  // >
                  //   <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  //   <g
                  //     id="SVGRepo_tracerCarrier"
                  //     strokeLinecap="round"
                  //     strokeLinejoin="round"
                  //   />
                  //   <g id="SVGRepo_iconCarrier">
                  //     {" "}
                  //     <g>
                  //       {" "}
                  //       <path d="M512,241.271h-42.912c-14.446,0-25.497-0.274-36.443,8.485c-9.542,7.631-13.326,16.335-21.618,27.974 l-12.785,17.728l0.17-0.241c-1.5,2.104-3.242,3.541-5.001,4.476c-1.767,0.92-3.493,1.34-5.275,1.34h-88.688 c0.992-1.589,2.065-3.154,3.291-4.639l28.442-34.515c42.734-2.298,76.564-17.084,99.907-36.846 c11.946-10.123,21.198-21.513,27.57-33.322c6.348-11.801,9.905-24.045,9.929-36.064c0-17.996,0-35.976,0-49.47 c0-6.743,0-12.365,0-16.301c0-3.928,0-6.171,0-6.178V68.841h-76.024v-22.94H121.71v22.94H43.404v14.858c0,0,0,35.974,0,71.95 c0.024,12.018,3.581,24.263,9.929,36.064c9.566,17.697,25.578,34.532,47.534,47.397c21.804,12.769,49.502,21.513,82.348,22.916 l28.32,34.37c1.227,1.484,2.3,3.05,3.292,4.639h-90.97c-1.782,0-3.509-0.42-5.276-1.34c-1.758-0.935-3.5-2.371-5-4.476 l-12.616-17.488c-8.292-11.64-12.075-20.343-21.618-27.974c-10.946-8.759-21.988-8.485-36.451-8.485H0l16.939,38.387L0,317.577 c0,0,55.124,0,55.608,0c12.083,0,18.158,14.059,22.892,20.98c11.018,16.108,14.204,24.4,22.892,31.16 c11.445,8.896,18.148,7.622,33.063,7.614h86.679v14.954l-66.28,22.158v51.656H359.42v-12.567v-39.088l-66.28-22.158v-14.954h84.396 c14.906,0.008,21.618,1.282,33.071-7.614c8.68-6.76,11.865-15.052,22.884-31.16c4.736-6.921,10.809-20.98,22.884-20.98 c0.492,0,55.624,0,55.624,0l-16.955-37.919L512,241.271z M392.564,98.557h46.308c0,13.81,0,35.442,0,57.092 c0.024,5.953-1.912,13.737-6.364,21.964c-6.646,12.349-18.802,25.57-36.395,35.854c-10.438,6.098-22.787,11.196-37.064,14.584 l5.727-6.945c17.955-21.787,27.804-48.841,27.788-76.733V98.557z M100.101,202.344c-9.308-7.864-16.181-16.503-20.617-24.731 c-4.444-8.227-6.388-16.011-6.356-21.964c0-17.996,0-35.976,0-49.47c0-2.742,0-5.291,0-7.622h48.582v45.816 c-0.016,27.892,9.833,54.946,27.788,76.733l6.244,7.566C132.107,223.526,113.58,213.733,100.101,202.344z M334.278,432.544v8.414 h-154.29v-8.414l66.288-22.149v-33.063h21.723v33.063L334.278,432.544z M283.332,280.408c-5.114,6.203-9.01,13.196-11.615,20.626 h-29.168c-2.597-7.43-6.501-14.422-11.599-20.626l-62.045-75.29c-14.333-17.414-22.053-38.774-22.053-60.746v-73.33h220.569v73.33 c0,21.972-7.72,43.332-22.061,60.746L283.332,280.408z" />{" "}
                  //       <path d="M293.1,137.492l-24.101-1.089l-8.494-22.585c-0.702-1.879-2.501-3.13-4.509-3.13 c-2.009,0-3.808,1.25-4.517,3.13l-8.486,22.585l-24.094,1.089c-2.016,0.098-3.751,1.42-4.379,3.332 c-0.621,1.911,0.016,4.008,1.581,5.259l18.867,15.052l-6.421,23.263c-0.532,1.928,0.193,4,1.814,5.178 c1.63,1.186,3.816,1.226,5.494,0.129l20.142-13.292l20.14,13.292c1.678,1.105,3.856,1.057,5.494-0.129 c1.621-1.178,2.339-3.25,1.815-5.178l-6.42-23.263l18.859-15.052c1.581-1.25,2.202-3.348,1.588-5.259 C296.851,138.912,295.109,137.589,293.1,137.492z" />{" "}
                  //     </g>{" "}
                  //   </g>
                  // </svg>
                )}
                {/* Render additional icons for 3rd, 2nd, and 1st place */}
                {index === 2 && (
                  <Image
                    className="h-7 w-7"
                    src="/images/avatar/pyramid.svg"
                    width={256}
                    height={256}
                    alt="verified"
                  />
                )}
                {index === 1 && (
                  <Image
                    className="h-8 w-8"
                    src="/images/avatar/pyramid.svg"
                    width={256}
                    height={256}
                    alt="verified"
                  />
                )}
              </div>
            </div>
            <div className="ml-auto flex w-3/12 items-center justify-end">
              <div className="mr-2 text-lg font-bold">
                {user.total_credits || "?"}
              </div>
              <div>
                <Image
                  className="h-9 w-9"
                  src="/images/avatar/heart-check.svg"
                  width={256}
                  height={256}
                  alt="verified"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}
