"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/app/utils/supabaseClient"; // Ensure you have configured Supabase client

export default function Dash() {
  const [clients, setClients] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeSubscriptions, setActiveSubscriptions] = useState(0);
  const [activeNow, setActiveNow] = useState(0);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("new_clients").select("*");
      if (error) {
        console.error("Error fetching clients: ", error);
      } else {
        setClients(data);
        calculateMetrics(data);
      }
    };

    fetchClients();
  }, []);

  const calculateMetrics = (clientsData) => {
    const totalRevenue = clientsData.reduce(
      (acc, client) => acc + client.price,
      0
    );
    const activeSubscriptions = clientsData.filter(
      (client) => client.status === "Active"
    ).length;
    const activeNow = clientsData.filter(
      (client) => client.status === "Active"
    ).length;

    setTotalRevenue(totalRevenue);
    setActiveSubscriptions(activeSubscriptions);
    setActiveNow(activeNow);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Calculated from all transactions
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSubscriptions}</div>
              <p className="text-xs text-muted-foreground">
                Active subscriptions
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">
                Total sales transactions
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeNow}</div>
              <p className="text-xs text-muted-foreground">
                Currently active clients
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your clients.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="font-medium">{client.name}</div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        {client.total_sales}
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        {new Date(client.member_since).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${client.price.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
