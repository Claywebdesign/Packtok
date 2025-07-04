"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import { Label } from "@packtok/ui/components/label";
import { Textarea } from "@packtok/ui/components/textarea";
import { Loading } from "@packtok/ui/components/loading";
import { CustomCombobox, ComboboxOption } from "@packtok/ui/components/custom-combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@packtok/ui/components/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@packtok/ui/components/form";
import {
  Upload,
  X,
  Save,
  FileVideo,
  FileText,
  Plus,
  Minus,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  useCategories,
  useCreateProduct,
  useCreateCategory,
} from "../../../../hooks";
import { productSchema, type ProductFormData } from "../../../../schemas/product-schema";

export default function AddProductForm() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [specifications, setSpecifications] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);
  const router = useRouter();

  const { data: categories = [], error: categoriesError } = useCategories();
  const createProductMutation = useCreateProduct();
  const createCategoryMutation = useCreateCategory();

  useEffect(() => {
    if (categoriesError) {
      toast.error("Failed to load categories");
    }
  }, [categoriesError]);

  useEffect(() => {
    if (createProductMutation.error) {
      toast.error("Failed to create product");
    }
  }, [createProductMutation.error]);

  useEffect(() => {
    if (createCategoryMutation.error) {
      toast.error("Failed to create category");
    }
  }, [createCategoryMutation.error]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      quantity: 1,
      productType: "MACHINERY",
      condition: "NEW",
      manufacturer: "",
      model: "",
      categoryName: "",
      specifications: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          formData.append(key, value.toString());
        }
      });

      const validSpecs = specifications.filter(
        (spec) => spec.key.trim() && spec.value.trim()
      );
      if (validSpecs.length > 0) {
        const specsObj = validSpecs.reduce(
          (acc, spec) => {
            acc[spec.key] = spec.value;
            return acc;
          },
          {} as Record<string, string>
        );
        formData.append("specifications", JSON.stringify(specsObj));
      }

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      uploadedImages.forEach((image) => {
        formData.append("images", image);
      });

      if (video) {
        formData.append("video", video);
      }

      if (videoThumbnail) {
        formData.append("videoThumbnail", videoThumbnail);
      }

      if (pdf) {
        formData.append("pdf", pdf);
      }

      await createProductMutation.mutateAsync(formData);

      toast.success("Product created successfully");

      form.reset();
      setUploadedImages([]);
      setThumbnail(null);
      setVideo(null);
      setVideoThumbnail(null);
      setPdf(null);
      setSpecifications([{ key: "", value: "" }]);

      router.push("/dashboard/products");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && uploadedImages.length + files.length <= 5) {
      const newImages = Array.from(files);
      setUploadedImages([...uploadedImages, ...newImages]);
    } else if (files && uploadedImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
    }
  };

  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  const handleVideoThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoThumbnail(file);
    }
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdf(file);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index: number) => {
    if (specifications.length > 1) {
      setSpecifications(specifications.filter((_, i) => i !== index));
    }
  };

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const watchedProductType = form.watch("productType");

  const categoryOptions: ComboboxOption[] = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const handleCreateCategory = async (categoryName: string) => {
    try {
      await createCategoryMutation.mutateAsync({ name: categoryName });
      form.setValue("categoryName", categoryName);
      toast.success(`Category "${categoryName}" created successfully`);
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  const productTypeOptions = [
    { value: "MACHINERY", label: "Machinery" },
    { value: "SPARE_PARTS", label: "Spare Parts" },
    { value: "CONSUMABLES", label: "Consumables" },
    { value: "RAW_MATERIALS", label: "Raw Materials" },
  ];

  const machineTypeOptions = [
    { value: "MONO_CARTON", label: "Mono Carton" },
    { value: "MASTER_CARTON", label: "Master Carton" },
    { value: "BOTH", label: "Both" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <div className="max-w-4xl mx-auto relative">
      {createProductMutation.isPending && (
        <Loading variant="jimu" className="z-10" />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Product Media
            </h3>

            <div className="mb-6">
              <Label className="text-sm font-medium mb-2 block">
                Thumbnail Image *
              </Label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 cursor-pointer">
                  <label className="cursor-pointer text-center">
                    <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Thumbnail</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {thumbnail && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {thumbnail.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setThumbnail(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <Label className="text-sm font-medium mb-2 block">
                Gallery Images (Max 5)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 cursor-pointer">
                  <label className="cursor-pointer text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Add Images</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-gray-100 rounded-lg"
                  >
                    <div className="absolute inset-0 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-xs">
                        {image.name.substring(0, 10)}...
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Product Video (Optional)
                </Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 cursor-pointer">
                    <label className="cursor-pointer text-center">
                      <FileVideo className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-600">Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {video && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {video.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setVideo(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Video Thumbnail (Optional)
                </Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 cursor-pointer">
                    <label className="cursor-pointer text-center">
                      <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-600">Vid Thumb</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleVideoThumbnailUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {videoThumbnail && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {videoThumbnail.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setVideoThumbnail(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Specification Sheet PDF (Optional)
              </Label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 cursor-pointer">
                  <label className="cursor-pointer text-center">
                    <FileText className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">PDF</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {pdf && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{pdf.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setPdf(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product description"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter quantity"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter price"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Category & Type
                </h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="productType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {productTypeOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchedProductType === "MACHINERY" && (
                    <FormField
                      control={form.control}
                      name="machineType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Machine Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select machine type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {machineTypeOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="categoryName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <CustomCombobox
                            options={categoryOptions}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Select or create category..."
                            searchPlaceholder="Search categories..."
                            emptyText="No categories found."
                            onCreateNew={handleCreateCategory}
                            createNewLabel="Create category"
                            disabled={createCategoryMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Details
                </h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="NEW">New</SelectItem>
                            <SelectItem value="USED">Used</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand/Manufacturer</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter model" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter year"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  parseInt(e.target.value) || undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Specifications
                    </Label>
                    <div className="space-y-2">
                      {specifications.map((spec, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            placeholder="Key (e.g., power)"
                            value={spec.key}
                            onChange={(e) =>
                              updateSpecification(index, "key", e.target.value)
                            }
                            className="flex-1"
                          />
                          <Input
                            placeholder="Value (e.g., 5kW)"
                            value={spec.value}
                            onChange={(e) =>
                              updateSpecification(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSpecification(index)}
                            disabled={specifications.length === 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addSpecification}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Specification
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={createProductMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {createProductMutation.isPending ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}