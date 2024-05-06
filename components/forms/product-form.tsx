"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import Select from 'react-select';
import { Checkbox } from "@/components/ui/checkbox";
// import FileUpload from "@/components/FileUpload";
import { useToast } from "../ui/use-toast";
import FileUpload from "../file-upload";
const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});
export const IMG_MAX_LIMIT = 3;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#212121',
    color: state.isFocused ? 'white' : 'black',
    borderColor: state.isFocused ? '#4A90E2' : 'black',
    boxShadow: state.isFocused ? '0 0 0 1px #4A90E2' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#4A90E2' : '#aaa'
    }
  }),
  menu: (provided) => ({
    ...provided,
    background: '#212121', // Set the dropdown background color
    color: 'white', // Ensure text color is white for all items
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#333333' : '#212121', // Darker when item is focused
    color: state.isSelected ? '#FFF' : 'white',
    '&:hover': {
      background: '#333333', // Darker background on hover
    }
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#4A5568',
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: '#2b2d42',
      color: 'white',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white', // Ensures text color within the select control is white
  }),
};

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  apps: z.array(z.string()).min(1, { message: "Select at least one app" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const appsOptions = [
  { id: 'app1', name: 'Google Gmail' },
  { id: 'app2', name: 'Slack' },
  { id: 'app3', name: 'Slack' },
  { id: 'app4', name: 'Slack' },
  { id: 'app5', name: 'Slack' },
  { id: 'app6', name: 'Slack' },
  { id: 'app7', name: 'Slack' },
  { id: 'app8', name: 'Slack' },
  // Add more apps as needed
];

type EmployeeFormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
  initialData: any | null;
  categories: any;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
      name: "",
      description: "",
      price: 0,
      imgUrl: [],
      category: "",
    };

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard/employees/${params.employeeId}`);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // const triggerImgUrlValidation = () => form.trigger("imgUrl");




  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Input {...form.register('name')} placeholder="Name" />
          {form.formState.errors.name && <p>{form.formState.errors.name.message}</p>}
        </div>
        <div>
          <Input {...form.register('email')} type="email" placeholder="Email" />
          {form.formState.errors.email && <p>{form.formState.errors.email.message}</p>}
        </div>
        <div>
          {/* <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Apps" />
            </SelectTrigger>
            <SelectContent>
              {appsOptions.map((app) => (
                <SelectItem key={app.id} value={app.id}>
                  {app.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          <div>
            <Select
              isMulti
              options={appsOptions}
              placeholder="Select Apps"
              className="basic-multi-select"
              classNamePrefix="select"
              styles={customStyles}
            />
            {form.formState.errors.apps && <p>{form.formState.errors.apps.message}</p>}
          </div>


          {form.formState.errors.apps && <p>{form.formState.errors.apps.message}</p>}
        </div>
        <div>
          <Input {...form.register('password')} type="password" placeholder="Password" />
          {form.formState.errors.password && <p>{form.formState.errors.password.message}</p>}
        </div>
      </div>
      <Button type="submit">Add Employee</Button>
    </form>
  );
};
