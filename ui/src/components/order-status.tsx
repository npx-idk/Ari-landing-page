import * as React from "react"

import { cn } from "@ari/ui/lib/utils"
import { Badge } from "./badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Icons } from "./icons"

type OrderData = {
  id: string
  name: string
  displayFinancialStatus: string
  displayFulfillmentStatus: string
  createdAt: string
}

type OrderStatusProps = React.ComponentProps<typeof Card> & {
  order: OrderData
}

function getReadableDate(isoDate: string) {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function extractNumericId(gid: string) {
  const parts = gid.split("/")
  const last = parts[parts.length - 1]
  return last || gid
}

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"]

function getFinancialStatusMeta(status: string): { label: string; variant: BadgeVariant; Icon: React.ComponentType<any>; iconClassName?: string } {
  const normalized = status?.toUpperCase?.() || ""
  switch (normalized) {
    case "PAID":
    case "AUTHORIZED":
      return { label: normalized, variant: "default", Icon: Icons.check }
    case "PENDING":
    case "PARTIALLY_PAID":
      return { label: normalized, variant: "secondary", Icon: Icons.info }
    case "REFUNDED":
    case "PARTIALLY_REFUNDED":
      return { label: normalized, variant: "outline", Icon: Icons.rotateCcw }
    case "VOIDED":
    case "UNPAID":
      return { label: normalized, variant: "destructive", Icon: Icons.alertTriangle }
    default:
      return { label: normalized || "UNKNOWN", variant: "outline", Icon: Icons.info }
  }
}

function getFulfillmentStatusMeta(status: string): { label: string; variant: BadgeVariant; Icon: React.ComponentType<any>; iconClassName?: string } {
  const normalized = status?.toUpperCase?.() || ""
  switch (normalized) {
    case "FULFILLED":
      return { label: normalized, variant: "default", Icon: Icons.check }
    case "IN_PROGRESS":
      return { label: normalized, variant: "secondary", Icon: Icons.spinner, iconClassName: "animate-spin" }
    case "PARTIAL":
    case "UNFULFILLED":
    case "ON_HOLD":
      return { label: normalized, variant: "secondary", Icon: Icons.info }
    case "CANCELLED":
    case "RESTOCKED":
      return { label: normalized, variant: "destructive", Icon: Icons.alertTriangle }
    default:
      return { label: normalized || "UNKNOWN", variant: "outline", Icon: Icons.info }
  }
}

export function OrderStatus({ order, className, ...props }: OrderStatusProps) {
  const financial = getFinancialStatusMeta(order.displayFinancialStatus)
  const fulfillment = getFulfillmentStatusMeta(order.displayFulfillmentStatus)

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{order.name}</span>
          <span className="text-muted-foreground text-xs font-normal">ID: {extractNumericId(order.id)}</span>
        </CardTitle>
        <CardDescription>Created {getReadableDate(order.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs">Financial status</span>
            <Badge variant={financial.variant} aria-label={`Financial status ${financial.label}`}>
              <financial.Icon className={cn("size-3", (financial as any).iconClassName)} />
              <span className="uppercase tracking-wide">{financial.label}</span>
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs">Fulfillment status</span>
            <Badge variant={fulfillment.variant} aria-label={`Fulfillment status ${fulfillment.label}`}>
              <fulfillment.Icon className={cn("size-3", fulfillment.iconClassName)} />
              <span className="uppercase tracking-wide">{fulfillment.label}</span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export type { OrderData }


