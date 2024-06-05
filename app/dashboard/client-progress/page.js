"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  PlusCircle,
  ListFilter,
  MoreHorizontal,
  PanelLeft,
  File,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import AddClientModal from "@/components/AddClientModal";
import { supabase } from "@/app/utils/supabaseClient";

const ClientProgress = () => {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 for starting data
  const [weeklyData, setWeeklyData] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from("fitness_clients")
        .select("*");
      if (error) {
        console.error("Error fetching clients: ", error);
      } else {
        setClients(data);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchAllWeeklyData = async () => {
      const allWeeklyData = {};
      for (const client of clients) {
        if (selectedWeek === 0) {
          allWeeklyData[client.client_id] = client;
        } else {
          const { data, error } = await supabase
            .from("weekly_reports")
            .select("*")
            .eq("client_id", client.client_id)
            .eq("week", selectedWeek)
            .single();
          if (error) {
            console.error(
              "Error fetching weekly data for client",
              client.client_id,
              error
            );
            allWeeklyData[client.client_id] = {};
          } else {
            allWeeklyData[client.client_id] = data;
          }
        }
      }
      setWeeklyData(allWeeklyData);
    };

    if (clients.length > 0) {
      fetchAllWeeklyData();
    }
  }, [selectedWeek, clients]);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("fitness_clients")
        .delete()
        .eq("client_id", id);
      if (error) {
        console.error("Error deleting client: ", error);
      } else {
        setClients((prevClients) =>
          prevClients.filter((client) => client.client_id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting client: ", error);
    }
  };

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const renderClientData = (client) => {
    const data = weeklyData[client.client_id] || {};

    return (
      <TableRow key={client.client_id}>
        <TableCell className="font-medium">
          <Link href={`/dashboard/client-progress/${client.client_id}`}>
            {client.first_name} {client.last_name}
          </Link>
        </TableCell>
        <TableCell>{client.start_weight} lbs</TableCell>
        <TableCell>{data.weight || client.start_weight} lbs</TableCell>
        <TableCell>
          {data.body_weight_percentage || client.start_body_fat_percentage} %
        </TableCell>
        <TableCell>{data.bmi || client.start_bmi}</TableCell>
        <TableCell>{data.number_of_workouts || "N/A"}</TableCell>
        <TableCell>{data.notes || "N/A"}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(client.client_id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs"></SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Client Progress</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <Button size="sm" className="h-8 gap-1" onClick={handleDialogOpen}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Client
              </span>
            </Button>
            <Link href="/dashboard/upload">
              <Button size="sm" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Upload Data
                </span>
              </Button>
            </Link>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                  <TabsTrigger value="archived" className="hidden sm:flex">
                    Archived
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Archived
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
                </div>
              </div>
              <div className="mt-4 mb-4 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Week {selectedWeek === 0 ? "Starting Data" : selectedWeek}
                      <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setSelectedWeek(0)}>
                      Starting Data
                    </DropdownMenuItem>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
                      <DropdownMenuItem
                        key={week}
                        onSelect={() => setSelectedWeek(week)}
                      >
                        Week {week}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Clients Progress</CardTitle>
                    <CardDescription>
                      Manage your clients and view their performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Start Weight</TableHead>
                          <TableHead>Current Weight</TableHead>
                          <TableHead>Body Fat Percentage</TableHead>
                          <TableHead>BMI</TableHead>
                          <TableHead>Number of Workouts</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clients.map((client) => renderClientData(client))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>{clients.length}</strong> of{" "}
                      <strong>{clients.length}</strong> clients
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      <AddClientModal open={open} onClose={handleDialogClose} />
    </TooltipProvider>
  );
};

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default ClientProgress;
