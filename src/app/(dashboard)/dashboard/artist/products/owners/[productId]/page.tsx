import { getAllOwnersAction } from "@/app/_actions/product"
import { Shell } from "@/components/shells/shell"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface OwnersPageProps {
    params: {
        productId: string
    }
}

export default async function ProductOwnersPage({
    params,
}: OwnersPageProps) {
    const id = Number(params.productId)

    const owners = await getAllOwnersAction({ id })

    return (
        <Shell>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {owners.map((owner, index) => (
                        <TableRow key={index}>
                            <TableCell>{owner.name}</TableCell>
                            <TableCell>{String(owner.email?.emailAddress)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Shell>
    )
}